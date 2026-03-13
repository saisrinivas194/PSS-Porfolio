import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://www.jcrbuilders.in",
  "https://jcrbuilders.in",
  "https://jadtech.site",
];

const MAX_URL_LENGTH = 2048;

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const url = request.nextUrl.searchParams.get("url");
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  if (url.length > MAX_URL_LENGTH) {
    return NextResponse.json({ error: "URL too long" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }
  if (target.protocol !== "https:") {
    return NextResponse.json({ error: "Only HTTPS URLs are allowed" }, { status: 400 });
  }

  const origin = `${target.protocol}//${target.hostname}`;
  if (!ALLOWED_ORIGINS.some((o) => origin === o || target.hostname === o.replace(/^https:\/\//, ""))) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }
  try {
    const screenshotApiUrl = `https://image.thum.io/get/width/640/crop/360/${encodeURIComponent(url)}`;
    const res = await fetch(screenshotApiUrl, {
      headers: { "User-Agent": "Portfolio-Screenshot/1.0" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }
    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Screenshot failed" }, { status: 502 });
  }
}
