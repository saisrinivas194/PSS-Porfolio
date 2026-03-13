"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Page error:", error);
    }
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 px-4 text-zinc-100">
      <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="max-w-md text-center text-sm text-zinc-400">
        An unexpected error occurred. You can try again or return home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-full border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
