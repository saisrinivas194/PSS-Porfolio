"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-zinc-100 antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="max-w-md text-center text-sm text-zinc-400">
            A critical error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
