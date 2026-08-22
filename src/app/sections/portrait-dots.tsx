"use client";

import { useEffect, useRef } from "react";

const IMAGE_SRC = "/images/IMG_9630.png";
const W = 480;
const H = 600;

const TONE_CELL = 4;
const TONE_GAMMA = 1.7;
const TONE_FLOOR = 0.015;
const TONE_MAX = 1600;

const EDGE_CELL = 3;
const EDGE_RATIO = 0.22;
const EDGE_MAX = 700;
const EDGE_LINK_DIST = 9;

const MIN_SEPARATION = 1.6;

type Dot = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  edge: boolean;
};

/**
 * Renders the profile photo as a portrait built entirely from dots and
 * short connecting lines — brightness-weighted stippling for the overall
 * form/shading, plus edge-traced contour dots (linked to their nearest
 * neighbor) for crisp facial detail — rather than showing the photo itself.
 */
export function PortraitDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;
    let dots: Dot[] = [];
    let links: [number, number][] = [];
    let sparkleIdx: number[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = IMAGE_SRC;
    img.onload = () => {
      if (cancelled) return;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;

      const scale = Math.max(W / img.width, H / img.height);
      const sw = W / scale;
      const sh = H / scale;
      const sx = (img.width - sw) / 2;
      const sy = Math.max(0, (img.height - sh) * 0.1);
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);

      const { data } = octx.getImageData(0, 0, W, H);
      const gray = new Float32Array(W * H);
      for (let i = 0; i < W * H; i++) {
        gray[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
      }

      const edge = new Float32Array(W * H);
      let maxEdge = 0;
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          const gx = gray[i - 1] - gray[i + 1];
          const gy = gray[i - W] - gray[i + W];
          const mag = Math.sqrt(gx * gx + gy * gy);
          edge[i] = mag;
          if (mag > maxEdge) maxEdge = mag;
        }
      }

      const rand = mulberry32(20260822);
      const accepted: Dot[] = [];

      const edgeThreshold = maxEdge * EDGE_RATIO;
      const edgeCandidates: { x: number; y: number; strength: number }[] = [];
      for (let cy = 0; cy < H; cy += EDGE_CELL) {
        for (let cx = 0; cx < W; cx += EDGE_CELL) {
          let best = -1;
          let bx = 0;
          let by = 0;
          for (let y = cy; y < Math.min(cy + EDGE_CELL, H); y++) {
            for (let x = cx; x < Math.min(cx + EDGE_CELL, W); x++) {
              const v = edge[y * W + x];
              if (v > best) {
                best = v;
                bx = x;
                by = y;
              }
            }
          }
          if (best > edgeThreshold) edgeCandidates.push({ x: bx, y: by, strength: best });
        }
      }
      edgeCandidates.sort((a, b) => b.strength - a.strength);
      for (const c of edgeCandidates.slice(0, EDGE_MAX)) {
        accepted.push({
          x: c.x,
          y: c.y,
          r: 0.9 + rand() * 0.5,
          baseAlpha: 0.65 + rand() * 0.3,
          phase: rand() * Math.PI * 2,
          speed: 0.5 + rand() * 1.2,
          edge: true,
        });
      }

      const toneStart = accepted.length;
      for (let cy = 0; cy < H; cy += TONE_CELL) {
        for (let cx = 0; cx < W; cx += TONE_CELL) {
          if (accepted.length - toneStart >= TONE_MAX) break;
          const x = Math.min(W - 1, cx + Math.floor(rand() * TONE_CELL));
          const y = Math.min(H - 1, cy + Math.floor(rand() * TONE_CELL));
          const b = gray[y * W + x];
          const prob = Math.max(TONE_FLOOR, Math.pow(b, TONE_GAMMA));
          if (rand() < prob) {
            let tooClose = false;
            for (let k = accepted.length - 1; k >= Math.max(0, accepted.length - 40); k--) {
              const d = accepted[k];
              if (Math.hypot(d.x - x, d.y - y) < MIN_SEPARATION) {
                tooClose = true;
                break;
              }
            }
            if (!tooClose) {
              accepted.push({
                x,
                y,
                r: 0.4 + rand() * 0.5,
                baseAlpha: 0.25 + b * 0.5,
                phase: rand() * Math.PI * 2,
                speed: 0.4 + rand() * 1.0,
                edge: false,
              });
            }
          }
        }
      }

      dots = accepted;

      const edgeDots = dots.filter((d) => d.edge);
      const pairLinks: [number, number][] = [];
      for (let i = 0; i < edgeDots.length; i++) {
        let bestJ = -1;
        let bestD = EDGE_LINK_DIST;
        for (let j = 0; j < edgeDots.length; j++) {
          if (i === j) continue;
          const d = Math.hypot(edgeDots[i].x - edgeDots[j].x, edgeDots[i].y - edgeDots[j].y);
          if (d < bestD) {
            bestD = d;
            bestJ = j;
          }
        }
        if (bestJ !== -1) {
          const gi = dots.indexOf(edgeDots[i]);
          const gj = dots.indexOf(edgeDots[bestJ]);
          pairLinks.push([gi, gj]);
        }
      }
      links = pairLinks;

      sparkleIdx = Array.from({ length: dots.length }, (_, i) => i)
        .sort(() => rand() - 0.5)
        .slice(0, Math.min(50, Math.floor(dots.length * 0.03)));

      let t = 0;
      const draw = () => {
        if (cancelled) return;
        t += 0.016;
        ctx.clearRect(0, 0, W, H);

        ctx.lineWidth = 0.7;
        ctx.strokeStyle = "rgba(147,197,253,0.5)";
        for (const [a, b] of links) {
          const da = dots[a];
          const db = dots[b];
          ctx.beginPath();
          ctx.moveTo(da.x, da.y);
          ctx.lineTo(db.x, db.y);
          ctx.stroke();
        }

        for (const d of dots) {
          const twinkle = 0.5 + 0.5 * Math.sin(t * d.speed + d.phase);
          const alpha = d.baseAlpha * (0.6 + 0.4 * twinkle);
          ctx.beginPath();
          ctx.fillStyle = d.edge
            ? `rgba(219,234,254,${alpha})`
            : `rgba(147,197,253,${alpha})`;
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowColor = "rgba(191,219,254,0.95)";
        for (const idx of sparkleIdx) {
          const d = dots[idx];
          const twinkle = 0.5 + 0.5 * Math.sin(t * d.speed * 1.3 + d.phase);
          if (twinkle < 0.75) continue;
          const boost = (twinkle - 0.75) / 0.25;
          ctx.shadowBlur = 6 * boost;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${0.7 * boost})`;
          ctx.arc(d.x, d.y, d.r + boost * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        rafId = requestAnimationFrame(draw);
      };
      draw();
    };

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Portrait of Sai Srinivas Pedhapolla rendered entirely as dots and connecting lines"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
