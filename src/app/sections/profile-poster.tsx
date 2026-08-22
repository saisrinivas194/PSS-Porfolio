import Image from "next/image";

/**
 * Clean poster-style portrait: the actual photo, clearly visible, with a
 * minimal frame and a name/title caption like a movie-poster credit line.
 */
export function ProfilePoster() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 shadow-xl shadow-black/50">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src="/images/IMG_9630.png"
          alt="Sai Srinivas Pedhapolla"
          fill
          priority
          sizes="(min-width: 768px) 420px, 100vw"
          className="object-cover object-top"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-base font-semibold text-white">Sai Srinivas Pedhapolla</p>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
          Data Engineer
        </p>
      </div>
    </div>
  );
}
