"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full border border-zinc-600 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-blue-400 hover:text-blue-200"
    >
      Save as PDF →
    </button>
  );
}
