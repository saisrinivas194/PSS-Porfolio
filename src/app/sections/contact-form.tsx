"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(typeof data?.error === "string" ? data.error : "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or use the direct contact links.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-zinc-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/0 transition focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-zinc-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/0 transition focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-xs font-medium text-zinc-300">
          Phone <span className="text-zinc-500">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/0 transition focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30"
          placeholder="+1 (555) 000-0000"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-medium text-zinc-300">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={5000}
          className="w-full resize-none rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-100 outline-none ring-blue-500/0 transition focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/30"
          placeholder="Tell me about the role, team, or project..."
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-green-400">
          Message sent. I&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
