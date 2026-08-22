"use client";

import { useEffect, useRef } from "react";

const IMAGE_SRC = "/images/IMG_9630.png";
const SIZE = 440;
const GRID_CELL = 6;
const EDGE_THRESHOLD_RATIO = 0.16;
const MAX_POINTS = 320;
const LINK_DIST = 24;

type Point = {
  x: number;
  y: number;
  baseR: number;
  phase: number;
  speed: number;
};

/**
 * Renders the profile photo as a portrait made of edge-sampled dots and
 * connecting lines, with each dot gently twinkling — a constellation
 * rendering rather than the literal photo.
 */
export function PortraitConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;
    let points: Point[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const img = new Image();
    img.src = IMAGE_SRC;
    img.onload = () => {
      if (cancelled) return;

      const off = document.createElement("canvas");
      off.width = SIZE;
      off.height = SIZE;
      const octx = off.getContext("2d");
      if (!octx) return;

      const scale = Math.max(SIZE / img.width, SIZE / img.height);
      const sw = SIZE / scale;
      const sh = SIZE / scale;
      const sx = (img.width - sw) / 2;
      const sy = Math.max(0, (img.height - sh) * 0.12);
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, SIZE, SIZE);

      const { data } = octx.getImageData(0, 0, SIZE, SIZE);
      const gray = new Float32Array(SIZE * SIZE);
      for (let i = 0; i < SIZE * SIZE; i++) {
        gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
      }

      const edge = new Float32Array(SIZE * SIZE);
      let maxEdge = 0;
      for (let y = 1; y < SIZE - 1; y++) {
        for (let x = 1; x < SIZE - 1; x++) {
          const i = y * SIZE + x;
          const gx = gray[i - 1] - gray[i + 1];
          const gy = gray[i - SIZE] - gray[i + SIZE];
          const mag = Math.sqrt(gx * gx + gy * gy);
          edge[i] = mag;
          if (mag > maxEdge) maxEdge = mag;
        }
      }

      const candidates: { x: number; y: number; strength: number }[] = [];
      const threshold = maxEdge * EDGE_THRESHOLD_RATIO;
      for (let cy = 0; cy < SIZE; cy += GRID_CELL) {
        for (let cx = 0; cx < SIZE; cx += GRID_CELL) {
          let best = -1;
          let bestX = 0;
          let bestY = 0;
          for (let y = cy; y < Math.min(cy + GRID_CELL, SIZE); y++) {
            for (let x = cx; x < Math.min(cx + GRID_CELL, SIZE); x++) {
              const v = edge[y * SIZE + x];
              if (v > best) {
                best = v;
                bestX = x;
                bestY = y;
              }
            }
          }
          if (best > threshold) {
            candidates.push({ x: bestX, y: bestY, strength: best });
          }
        }
      }

      candidates.sort((a, b) => b.strength - a.strength);
      points = candidates.slice(0, MAX_POINTS).map((c) => ({
        x: c.x,
        y: c.y,
        baseR: 0.9 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.4,
      }));

      let t = 0;
      const draw = () => {
        if (cancelled) return;
        t += 0.016;
        ctx.clearRect(0, 0, SIZE, SIZE);

        ctx.lineWidth = 0.6;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < LINK_DIST) {
              ctx.globalAlpha = (1 - d / LINK_DIST) * 0.35;
              ctx.strokeStyle = "rgba(96,165,250,1)";
              ctx.beginPath();
              ctx.moveTo(points[i].x, points[i].y);
              ctx.lineTo(points[j].x, points[j].y);
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1;
        for (const p of points) {
          const twinkle = 0.5 + 0.5 * Math.sin(t * p.speed + p.phase);
          const r = p.baseR * (0.7 + twinkle * 0.7);
          const alpha = 0.35 + twinkle * 0.65;
          ctx.beginPath();
          ctx.fillStyle = `rgba(191,219,254,${alpha})`;
          ctx.shadowColor = "rgba(96,165,250,0.9)";
          ctx.shadowBlur = 3 + twinkle * 5;
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }

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
      aria-label="Portrait of Sai Srinivas Pedhapolla rendered as a constellation of connected, twinkling dots"
      style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}
      className="mx-auto block"
    />
  );
}
