import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-neutral-950 px-4 text-zinc-100">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-center text-zinc-400">
        This page doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-400"
      >
        Back to home
      </Link>
    </main>
  );
}
