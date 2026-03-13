"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const MAX_INPUT_LENGTH = 2000;

const SUGGESTIONS = [
  "What ETL experience does Sai have?",
  "Tell me about his data pipeline projects.",
  "What skills and technologies does Sai use?",
];

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function ChatAssistant() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm an AI assistant trained on Sai's resume and GitHub. Ask me about his experience, ETL pipelines, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e?: FormEvent, suggested?: string) {
    e?.preventDefault();
    const text = (suggested ?? input.trim()).slice(0, MAX_INPUT_LENGTH);
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    if (!suggested) setInput("");
    setLoading(true);

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const controller = abortRef.current;

    const history = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history }),
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      const data = await res.json().catch(() => ({}));
      const content =
        typeof data?.answer === "string"
          ? data.answer
          : "I could not generate an answer right now.";
      const withDebug =
        data.debug && typeof data.debug === "string"
          ? `${content}\n\n(Dev: ${data.debug})`
          : content;
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: res.ok ? content : withDebug,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      if (controller.signal.aborted) return;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I wasn't able to reach the AI service. Please try again later.",
        },
      ]);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  const showSuggestions = messages.length <= 1;

  return (
    <div className="fixed bottom-4 right-4 z-30 w-full max-w-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 sm:hidden"
      >
        {open ? "Hide AI assistant" : "Ask the AI about Sai"}
      </button>

      <div
        className={`overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-sm shadow-2xl shadow-black/60 transition-transform ${
          open ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <div>
            <p className="text-xs font-semibold text-zinc-100">
              AI Assistant about Sai
            </p>
            <p className="text-[11px] text-zinc-500">
              Ask about projects, ETL experience, or skills.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="hidden rounded-full px-2 py-1 text-[10px] text-zinc-400 hover:bg-zinc-800 sm:inline"
          >
            Close
          </button>
        </div>

        <div className="flex h-72 flex-col sm:h-80">
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-3 text-xs"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-900 text-zinc-100"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="chat-markdown">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
                          li: ({ children }) => <li className="my-0.5">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noreferrer" className="text-blue-300 underline hover:text-blue-200">
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-900 px-3 py-2">
                  <span className="flex items-center gap-1 text-zinc-400">
                    <span className="animate-bounce [animation-delay:-0.3s]">.</span>
                    <span className="animate-bounce [animation-delay:-0.15s]">.</span>
                    <span className="animate-bounce">.</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {showSuggestions && !loading && (
            <div className="flex flex-wrap gap-1.5 border-t border-zinc-800 px-3 py-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSubmit(undefined, s)}
                  className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[10px] text-zinc-300 transition hover:border-blue-500/50 hover:bg-zinc-800 hover:text-blue-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex items-center gap-2 border-t border-zinc-800 px-3 py-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What ETL work has Sai done?"
              className="h-8 flex-1 rounded-full border border-zinc-800 bg-black/60 px-3 text-xs text-zinc-100 outline-none ring-blue-500/0 transition focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30"
            />
            {loading ? (
              <button
                type="button"
                onClick={handleStop}
                className="h-8 rounded-full bg-red-500/90 px-3 text-[11px] font-semibold text-white transition hover:bg-red-500"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="h-8 rounded-full bg-blue-500 px-3 text-[11px] font-semibold text-white disabled:opacity-50"
              >
                Send
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const MAX_HISTORY_MESSAGES = 20;
