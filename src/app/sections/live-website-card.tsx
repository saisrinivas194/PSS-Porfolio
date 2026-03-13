"use client";

import { useState } from "react";

/** Use our API route to fetch screenshot (avoids CORS). */
function screenshotUrl(siteUrl: string): string {
  return `/api/screenshot?url=${encodeURIComponent(siteUrl)}`;
}

const PLACEHOLDER_SVG =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect fill="#27272a" width="640" height="360"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#71717a" font-family="system-ui,sans-serif" font-size="14">Live site preview</text><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="#52525b" font-family="system-ui,sans-serif" font-size="12">Click to open</text></svg>'
  );

type Props = {
  label: string;
  href: string;
  description?: string;
  /** Optional: local path e.g. /images/jcrbuilders-screenshot.png overrides API screenshot */
  screenshot?: string;
};

export function LiveWebsiteCard({ label, href, description, screenshot }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = screenshot ?? screenshotUrl(href);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition hover:border-blue-500/70 hover:bg-zinc-900/80"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {!imgFailed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={`${label} — live site preview`}
            className="h-full w-full object-cover object-top transition group-hover:scale-[1.02]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-zinc-800/80"
            style={{ backgroundImage: `url(${PLACEHOLDER_SVG})`, backgroundSize: "cover" }}
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-0.5 p-4 text-left">
        <span className="font-medium text-zinc-100">{label}</span>
        {description && (
          <span className="text-xs text-zinc-400">{description}</span>
        )}
        <span className="mt-1 text-xs text-blue-300">Open live site →</span>
      </div>
    </a>
  );
}
