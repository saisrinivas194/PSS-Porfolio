import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { buildPortfolioContext } from "@/data/portfolio";

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

/**
 * Many models exist in AI Studio; we try these in order.
 * When one hits quota (429), the next is used. Order: higher quota first.
 */
const GEMINI_MODELS = [
  "gemini-3.1-flash-lite", // 15 RPM, 250K TPM, 500 RPD — try first (best quota)
  "gemini-2.5-flash-lite", // 10 RPM, 250K TPM, 20 RPD
  "gemini-2.5-flash",      // 5 RPM, 250K TPM, 20 RPD
  "gemini-3-flash",        // 5 RPM, 250K TPM, 20 RPD
];
const geminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

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

    let answer: string | undefined;

    try {
      if (useGemini) {
        const systemInstruction =
          SYSTEM_INSTRUCTIONS +
          "\n\nContext about Sai (resume + projects + skills):\n" +
          buildPortfolioContext();
        const contents: { role: string; parts: { text: string }[] }[] = [];
        for (const m of history) {
          contents.push({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          });
        }
        contents.push({ role: "user", parts: [{ text: trimmedMessage }] });

        const payload = {
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
        };

        let lastQuotaModel: string | null = null;
        for (const model of GEMINI_MODELS) {
          const geminiRes = await fetch(geminiUrl(model), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": GEMINI_API_KEY!,
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });
          const geminiText = await geminiRes.text();
          log({
            where: "gemini_after_fetch",
            model,
            ok: geminiRes.ok,
            status: geminiRes.status,
            body: geminiText.slice(0, 500),
          });

          if (geminiRes.ok) {
            const geminiData = JSON.parse(geminiText) as {
              candidates?: { content?: { parts?: { text?: string }[] } }[];
            };
            const raw =
              geminiData.candidates?.[0]?.content?.parts?.[0]?.text ??
              "I couldn’t find a good answer based on the current context.";
            answer = typeof raw === "string" ? raw.trim() : String(raw).trim();
            break;
          }

          const isQuota = geminiRes.status === 429;
          const isResourceExhausted =
            geminiText.includes("RESOURCE_EXHAUSTED") || geminiText.includes("quota");
          const isInvalidKey =
            geminiRes.status === 400 &&
            (geminiText.includes("API key not valid") || geminiText.includes("INVALID_ARGUMENT"));

          if (isInvalidKey) {
            clearTimeout(timeoutId);
            return NextResponse.json(
              {
                answer:
                  "The AI key for this assistant is missing or invalid. Get a free key at https://aistudio.google.com/apikey and set GEMINI_API_KEY in .env.local (restart the dev server after).",
                ...(process.env.NODE_ENV === "development" && {
                  debug: `Gemini ${geminiRes.status}: ${geminiText.slice(0, 200)}`,
                }),
              },
              { status: 502 }
            );
          }

          if (isQuota || isResourceExhausted) {
            lastQuotaModel = model;
            continue;
          }

          clearTimeout(timeoutId);
          return NextResponse.json(
            {
              answer:
                "I couldn’t reach the AI service right now. Please try again later or contact Sai directly.",
              ...(process.env.NODE_ENV === "development" && {
                debug: `Gemini ${geminiRes.status}: ${geminiText.slice(0, 200)}`,
              }),
            },
            { status: 502 }
          );
        }

        clearTimeout(timeoutId);
        if (typeof answer === "undefined") {
          return NextResponse.json(
            {
              answer:
                "The AI assistant has reached its free-tier limit for now. Please try again in a few minutes or contact Sai directly.",
              ...(process.env.NODE_ENV === "development" &&
                lastQuotaModel && { debug: `All models quota exceeded (last tried: ${lastQuotaModel})` }),
            },
            { status: 502 }
          );
        }
      } else {
        const messages: { role: string; content: string }[] = [
          { role: "system", content: SYSTEM_INSTRUCTIONS },
          { role: "system", content: `Context about Sai (full portfolio — experience, education, projects, skills, contact):\n${buildPortfolioContext()}` },
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

    if (typeof answer === "undefined") {
      return NextResponse.json(
        { answer: "I couldn’t generate a response. Please try again later." },
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

