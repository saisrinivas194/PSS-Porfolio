"use client";

import { useState } from "react";

type Props = { name: string; logoDomain: string; logoUrl?: string };

/**
 * Favicon from the organization's live website (Google Favicon API).
 * Use optional logoUrl for a direct image (e.g. local /images/... or external URL).
 * Falls back to first letter of name if the image fails.
 */
const faviconUrl = (domain: string, size = 64) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;

/** Only allow relative paths or HTTPS for logoUrl to avoid XSS. */
function safeLogoUrl(logoUrl: string | undefined, fallback: string): string {
  if (logoUrl == null || typeof logoUrl !== "string") return fallback;
  const t = logoUrl.trim();
  if (t.startsWith("/") && !t.startsWith("//")) return t;
  if (t.toLowerCase().startsWith("https://")) return t;
  return fallback;
}

export function CompanyLogo({ name, logoDomain, logoUrl }: Props) {
  const [failed, setFailed] = useState(false);
  const initial = name?.charAt(0)?.toUpperCase() ?? "?";
  const src = safeLogoUrl(logoUrl, faviconUrl(logoDomain));

  if (failed) {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300"
        aria-hidden
      >
        {initial}
      </div>
    );
  }

  return (
    <>
      <div
        className="absolute inset-0 rounded-full bg-zinc-800"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="relative z-10 h-full w-full object-contain"
        width={logoUrl ? 96 : 40}
        height={logoUrl ? 96 : 40}
        onError={() => setFailed(true)}
      />
    </>
  );
}
