import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const DEBUG_LOG = join(process.cwd(), ".cursor", "debug-b9358d.log");
const DEBUG_LOG_FALLBACK = join(process.cwd(), "api-ai-debug.log");
function log(payload: Record<string, unknown>) {
  const line = JSON.stringify({ ...payload, t: Date.now() }) + "\n";
  try {
    mkdirSync(dirname(DEBUG_LOG), { recursive: true });
    appendFileSync(DEBUG_LOG, line);
  } catch (_) {
    try {
      appendFileSync(DEBUG_LOG_FALLBACK, line);
    } catch (_) {}
  }
}

const RESUME_CONTEXT = `
Professional Summary:
Entry-level Data Engineer and Data Science graduate with internship experience designing and operating Python-based data pipelines, ETL/ELT workflows, and backend data services. Experience ingesting, modeling, and validating data from APIs, files, and relational databases for analytics and machine learning use cases. Hands-on automation of Linux-based workflows using Python and Bash, with strong focus on logging, monitoring, and data quality.

Goods Unite Us — Software Intern, NJ, USA:
- Engineered Python-based data pipelines and backend services with robust data modeling for analytics and ML workloads.
- Architected modular ETL/ELT components for structured and semi-structured data using object-oriented design and big data technologies.
- Automated high-volume data ingestion and validation using Linux-based workflows (Python + Bash) with robust logging and error handling.

Webdaddy — Python Developer R&D Specialist Intern, India:
- Developed Python-based tools and utilities to build end-to-end data pipelines integrating APIs, flat files, and relational databases.
- Implemented reusable, object-oriented Python modules for ETL/ELT workflows and transformation logic.
- Automated system and data workflows using Python and Bash with cron and task schedulers.

Findem — R&D Data Analyst Intern, Bengaluru, India:
- Engineered backend services using FastAPI, Django, and Java microservices to support scalable data ingestion and transformation.
- Maintained Linux-based data processing applications with a focus on throughput, reliability, and observability.
- Prepared ML training datasets with feature engineering, cleansing, and validation checks.

Featured Projects:
- Scalable Data Ingestion & ETL Pipeline: Python-based system for ingesting and processing structured datasets with modular ETL, validation, logging, and Linux-based workflows, supporting downstream ML model experimentation.
- Automated Analytics & Reporting Pipelines: Automation tools using Python and Bash to streamline data preparation for ML, integrating with JavaScript-based dashboards and reporting layers.

Key Skills:
- Programming: Python, SQL, Bash, C++, JavaScript, Java, C#.
- Data Engineering: ETL/ELT workflows, data ingestion, data modeling, schema management, modular pipeline design.
- Machine Learning: TensorFlow, feature engineering, EDA, statistical modeling.
- Cloud: AWS (S3, Glue exposure), GCP, Snowflake, Firebase.
- Databases: SQL Server, PostgreSQL, Snowflake, MongoDB.
`;

const SYSTEM_INSTRUCTIONS = `
You are a helpful AI assistant that answers questions about the candidate "Sai Srinivas Pedhapolla".
Use ONLY the context provided about Sai's resume, skills, and projects.

- Answer in a concise, recruiter-friendly way. Use short paragraphs and bullet points.
- Format your response in Markdown: use **bold** for emphasis, - for bullet lists, and clear line breaks.
- When relevant, structure with sections: Summary, Relevant Experience, Relevant Projects, Technologies Used.
- If the user asks a follow-up question, use the conversation history to stay consistent and avoid repeating yourself.
- If a question is not about Sai's background, politely say you can only answer questions about Sai's experience, skills, and projects.
- Keep answers focused and under 300 words unless the user asks for detail.
`;

const MAX_MESSAGE_LENGTH = 2000;
const MAX_BODY_BYTES = 50 * 1024; // 50KB (for history)
const MAX_HISTORY_MESSAGES = 20; // last 10 turns
const LLM_TIMEOUT_MS = 28000;

const GEMINI_MODEL = "gemini-2.5-flash"; // Free tier: 5 RPM, 250K TPM, 20 RPD (see AI Studio for your quota)
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return NextResponse.json({ answer: "Method not allowed." }, { status: 405 });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim();
  const useGemini = !!GEMINI_API_KEY;
  const useOpenAI = !!OPENAI_API_KEY;

  if (!useGemini && !useOpenAI) {
    return NextResponse.json(
      {
        answer:
          "The AI assistant is not configured yet. Add GEMINI_API_KEY (free) or OPENAI_API_KEY in .env.local. See .env.local.example.",
      },
      { status: 200 }
    );
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { answer: "Request must be JSON (Content-Type: application/json)." },
        { status: 400 }
      );
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { answer: "Request body too large." },
        { status: 413 }
      );
    }

    let body: { message?: unknown; history?: unknown };
    try {
      body = JSON.parse(raw) as { message?: unknown; history?: unknown };
    } catch {
      return NextResponse.json(
        { answer: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const message: string =
      typeof body.message === "string" ? body.message : String(body.message ?? "").slice(0, MAX_MESSAGE_LENGTH);

    if (!message.trim()) {
      return NextResponse.json(
        { answer: "Please provide a question about Sai's background." },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);

    // Build conversation history: only user/assistant, last N messages
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const history: { role: "user" | "assistant"; content: string }[] = [];
    for (let i = 0; i < rawHistory.length && history.length < MAX_HISTORY_MESSAGES; i++) {
      const item = rawHistory[i];
      if (item && typeof item === "object" && "role" in item && "content" in item) {
        const role = item.role === "assistant" ? "assistant" : item.role === "user" ? "user" : null;
        const content = typeof item.content === "string" ? item.content.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
        if (role && content) history.push({ role, content });
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

    let answer: string;

    try {
      if (useGemini) {
        const systemInstruction =
          SYSTEM_INSTRUCTIONS +
          "\n\nContext about Sai (resume + projects + skills):\n" +
          RESUME_CONTEXT;
        const contents: { role: string; parts: { text: string }[] }[] = [];
        for (const m of history) {
          contents.push({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          });
        }
        contents.push({ role: "user", parts: [{ text: trimmedMessage }] });

        const geminiRes = await fetch(GEMINI_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY!,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const geminiText = await geminiRes.text();
        log({
          where: "gemini_after_fetch",
          ok: geminiRes.ok,
          status: geminiRes.status,
          body: geminiText.slice(0, 500),
        });

        if (!geminiRes.ok) {
          const isQuota = geminiRes.status === 429;
          const isResourceExhausted = geminiText.includes("RESOURCE_EXHAUSTED") || geminiText.includes("quota");
          const isInvalidKey =
            geminiRes.status === 400 &&
            (geminiText.includes("API key not valid") || geminiText.includes("INVALID_ARGUMENT"));
          let userMsg =
            "I couldn’t reach the AI service right now. Please try again later or contact Sai directly.";
          if (isInvalidKey) {
            userMsg =
              "The AI key for this assistant is missing or invalid. Get a free key at https://aistudio.google.com/apikey and set GEMINI_API_KEY in .env.local (restart the dev server after).";
          } else if (isQuota || isResourceExhausted) {
            userMsg =
              "The AI assistant has reached its free-tier limit for now. Please try again in a few minutes or contact Sai directly.";
          }
          return NextResponse.json(
            {
              answer: userMsg,
              ...(process.env.NODE_ENV === "development" && {
                debug: `Gemini ${geminiRes.status}: ${geminiText.slice(0, 200)}`,
              }),
            },
            { status: 502 }
          );
        }

        const geminiData = JSON.parse(geminiText) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        const raw =
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text ??
          "I couldn’t find a good answer based on the current context.";
        answer = typeof raw === "string" ? raw.trim() : String(raw).trim();
      } else {
        const messages: { role: string; content: string }[] = [
          { role: "system", content: SYSTEM_INSTRUCTIONS },
          { role: "system", content: `Context about Sai (resume + projects + skills):\n${RESUME_CONTEXT}` },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: trimmedMessage },
        ];
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages,
            temperature: 0.3,
          }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const text = await response.text();
        log({
          where: "after_fetch",
          ok: response.ok,
          status: response.status,
          body: text.slice(0, 500),
        });

        if (!response.ok) {
          const isQuota = response.status === 429;
          const isAuth = response.status === 401 || response.status === 403;
          let userMessage =
            "I couldn’t reach the AI service right now. Please try again later or contact Sai directly.";
          if (isQuota) {
            userMessage =
              "The AI assistant has reached its usage limit for now. Sai can add more credits to enable it again—please try again later or contact him directly.";
          } else if (isAuth) {
            userMessage =
              "The AI assistant isn’t configured correctly right now. Please contact Sai directly for questions.";
          }
          return NextResponse.json(
            {
              answer: userMessage,
              ...(process.env.NODE_ENV === "development" && {
                debug: `OpenAI ${response.status}: ${text.slice(0, 200)}`,
              }),
            },
            { status: 502 }
          );
        }

        const data = JSON.parse(text) as { choices?: { message?: { content?: string } }[] };
        const rawAnswer =
          data.choices?.[0]?.message?.content ??
          "I couldn’t find a good answer based on the current context.";
        answer = typeof rawAnswer === "string" ? rawAnswer.trim() : String(rawAnswer).trim();
      }
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      const e = error as { message?: string; name?: string; cause?: { message?: string } };
      const errMsg = e?.message ?? e?.cause?.message ?? "unknown";
      const isTimeout = e?.name === "AbortError" || errMsg.includes("abort");
      log({ where: "fetch_error", name: e?.name, message: e?.message });
      return NextResponse.json(
        {
          answer: isTimeout
            ? "The request took too long. Please try again with a shorter question."
            : "Something went wrong while talking to the AI service. Please try again later or contact Sai directly.",
          ...(process.env.NODE_ENV === "development" && { debug: errMsg }),
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      {
        answer:
          "Something went wrong while generating an answer. Please try again later or contact Sai directly.",
      },
      { status: 500 }
    );
  }
}

