"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const MAX_INPUT_LENGTH = 2000;

/** Short, pleasant chime via Web Audio (no file needed). */
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    const playTone = (freq: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
      osc.start(start);
      osc.stop(start + duration);
    };
    playTone(523.25, 0, 0.12);
    playTone(659.25, 0.14, 0.15);
  } catch (_) {}
}

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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm JAD — an AI assistant trained on Sai's resume and GitHub. Ask me about his experience, ETL pipelines, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const attractSoundPlayed = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /* One-time gentle sound after 2.5s to draw attention to JAD (browser may block if no user gesture). */
  useEffect(() => {
    const t = setTimeout(() => {
      if (!attractSoundPlayed.current) {
        attractSoundPlayed.current = true;
        playNotificationSound();
      }
    }, 2500);
    return () => clearTimeout(t);
  }, []);

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
      playNotificationSound();
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
      playNotificationSound();
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  const showSuggestions = messages.length <= 1;

  /**
   * Chatbot avatar icon — senior UI/UX + eng standards:
   * Clear at 16–24px, single stroke weight, symmetric, one conceptual “AI” cue.
   */
  const RobotFaceIcon = ({ className = "size-5" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Head: single path, optical padding ~20% */}
      <path d="M6 8.5 C6 6.5 8.5 5 12 5 s6 1.5 6 3.5v9c0 2-2.5 3.5-6 3.5s-6-1.5-6-3.5V8.5z" />
      {/* Eyes: symmetric, equal weight, ~upper third */}
      <circle cx="9" cy="11" r="1.5" />
      <circle cx="15" cy="11" r="1.5" />
      {/* Mouth: single arc, approachable */}
      <path d="M9 16.2a4 4 0 0 0 6 0" />
      {/* AI / active: one dot, minimal */}
      <circle cx="12" cy="6.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );

  return (
    <>
      {/* Closed: message bubble + blinking icon button in bottom-right corner */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
          <div
            className="relative rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2.5 shadow-xl ring-1 ring-white/5"
            style={{ animation: "fadeIn 0.5s ease-out" }}
          >
            <p className="text-xs font-medium text-zinc-100">Ask me about Sai’s experience & projects!</p>
            <span className="absolute -right-1.5 bottom-6 size-3 rotate-45 border-r border-b border-zinc-700 bg-zinc-900" aria-hidden />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-3 shadow-lg shadow-blue-500/40 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
            style={{ animation: "blink 1.4s ease-in-out infinite" }}
            aria-label="Open JAD – AI assistant"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white">
              <RobotFaceIcon className="size-5" />
            </span>
            <span className="text-sm font-semibold text-white">JAD</span>
          </button>
        </div>
      )}

      {/* Chat panel: anchored bottom-right */}
      <div
        className={`fixed bottom-5 right-5 z-30 w-full max-w-sm transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-sm shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <RobotFaceIcon className="size-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-zinc-100">JAD</p>
              <p className="text-[11px] text-zinc-500">AI assistant · Ask about Sai’s experience & projects</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Close"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
    </>
  );
}

const MAX_HISTORY_MESSAGES = 20;
