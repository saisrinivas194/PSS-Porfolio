import { PortraitDots } from "./portrait-dots";

const DOT_GRID = Array.from({ length: 16 });

/**
 * Editorial poster treatment: dark "mat" card framing the portrait, a
 * kicker line + issue number like a magazine masthead, a dot-grid accent,
 * and a designed name/role caption below. The portrait itself (PortraitDots)
 * is built entirely from stippled dots and short connecting lines rather
 * than showing the photo directly.
 */
export function ProfilePoster() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-5 shadow-xl shadow-black/50">
      <div className="pointer-events-none absolute right-5 top-5 grid grid-cols-4 gap-1.5">
        {DOT_GRID.map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-blue-400/70" />
        ))}
      </div>

      <div className="flex items-center justify-between pr-24">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-400">
          Portfolio
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-600">
          No. 01
        </p>
      </div>

      <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
        <PortraitDots />
        <div className="pointer-events-none absolute left-2 top-2 size-5 border-l-2 border-t-2 border-blue-300/80" />
        <div className="pointer-events-none absolute bottom-2 right-2 size-5 border-b-2 border-r-2 border-blue-300/80" />
      </div>

      <div className="mt-4">
        <p className="text-xl font-bold tracking-tight text-white">
          Sai Srinivas Pedhapolla
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="h-px w-6 bg-blue-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Data Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
