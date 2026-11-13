"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn, formatCompact, formatCurrency, formatDate } from "@/lib/utils";

type Point = { date: string; value: number };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

/**
 * Single-series area chart: 2px line, faint fill, recessive grid, crosshair + tooltip on hover/focus.
 * Keyboard: focus the chart and use ←/→ to move the crosshair.
 */
export function AreaChart({
  data, height = 240, tone = "light", label, valueFormat = (v: number) => formatCurrency(v, "USD", 0),
}: { data: Point[]; height?: number; tone?: "light" | "dark"; label: string; valueFormat?: (v: number) => string }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const box = useRef<HTMLElement>(null);
  const [W, setW] = useState(720);
  // Measure real width so text and strokes render at true size on every screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 480 ? Math.round(height * 0.8) : height;
  const pad = { t: 12, r: 8, b: 26, l: 44 };
  const max = niceMax(Math.max(...data.map((d) => d.value), 1));
  const x = (i: number) => pad.l + (i / Math.max(1, data.length - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join("");
  const area = `${line}L${x(data.length - 1)},${H - pad.b}L${x(0)},${H - pad.b}Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const ink = tone === "dark" ? "rgba(255,255,255,0.45)" : "#777";
  const grid = tone === "dark" ? "rgba(255,255,255,0.08)" : "#ececec";
  const xLabels = W < 480 ? [0, data.length - 1] : [0, Math.floor(data.length / 3), Math.floor((2 * data.length) / 3), data.length - 1];

  const onMove = (clientX: number) => {
    const svg = ref.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const px = ((clientX - r.left) / r.width) * W;
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };
  const h = hover !== null ? data[hover] : null;

  return (
    <figure ref={box} className="relative">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-pan-y select-none outline-none"
        role="img"
        aria-label={`${label}. ${data.length} points from ${formatDate(data[0]?.date ?? new Date().toISOString())} to ${formatDate(data[data.length - 1]?.date ?? new Date().toISOString())}.`}
        tabIndex={0}
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerLeave={() => setHover(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setHover((v) => Math.min(data.length - 1, (v ?? -1) + 1));
          if (e.key === "ArrowLeft") setHover((v) => Math.max(0, (v ?? data.length) - 1));
        }}
        onBlur={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`g${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0866F9" stopOpacity={tone === "dark" ? 0.35 : 0.18} />
            <stop offset="100%" stopColor="#0866F9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke={grid} strokeWidth="1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill={ink}>{`$${formatCompact(t)}`}</text>
          </g>
        ))}
        {xLabels.map((i) => data[i] && (
          <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"} fontSize="11" fill={ink}>
            {formatDate(data[i].date)}
          </text>
        ))}
        <path d={area} fill={`url(#g${id})`} />
        <path d={line} fill="none" stroke="#0866F9" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {h && hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={H - pad.b} stroke={tone === "dark" ? "rgba(255,255,255,0.35)" : "#bbb"} strokeDasharray="3 3" />
            <circle cx={x(hover)} cy={y(h.value)} r="5" fill="#0866F9" stroke={tone === "dark" ? "#141414" : "#fff"} strokeWidth="2" />
          </g>
        )}
      </svg>
      {h && hover !== null && (
        <div
          className={cn(
            "pointer-events-none absolute top-1 z-10 -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-[12px] shadow-lg",
            tone === "dark" ? "bg-white text-ink" : "bg-ink text-white",
          )}
          style={{ left: `${(x(hover) / W) * 100}%` }}
        >
          <div className="opacity-60">{formatDate(h.date, { month: "short", day: "numeric", year: "numeric" })}</div>
          <div className="font-medium tabular-nums">{valueFormat(h.value)}</div>
        </div>
      )}
      <span className="sr-only" aria-live="polite">{h ? `${formatDate(h.date)}: ${valueFormat(h.value)}` : ""}</span>
    </figure>
  );
}

/** Ranked horizontal bars — clearer than a donut for comparing a handful of categories. */
export function RankedBars({ items, tone = "light" }: { items: { label: string; value: number }[]; tone?: "light" | "dark" }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label} className="group">
          <div className={cn("mb-1.5 flex items-baseline justify-between text-[13px]", tone === "dark" ? "text-white/80" : "text-ink")}>
            <span>{it.label}</span>
            <span className="tabular-nums">
              {formatCurrency(it.value, "USD", 0)}
              <span className={cn("ml-2 text-[12px]", tone === "dark" ? "text-white/45" : "text-muted")}>{((it.value / total) * 100).toFixed(1)}%</span>
            </span>
          </div>
          <div className={cn("h-2 overflow-hidden rounded-full", tone === "dark" ? "bg-white/[0.07]" : "bg-fog")}>
            <div className="h-full rounded-full bg-electric transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover:bg-bright" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Compact column chart with per-bar hover tooltips. */
export function Columns({ data, label, height = 160 }: { data: Point[]; label: string; height?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = useMemo(() => niceMax(Math.max(...data.map((d) => d.value), 1)), [data]);
  return (
    <figure aria-label={label} role="img" className="relative">
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {data.map((d, i) => (
          <div
            key={d.date}
            className="group relative flex h-full flex-1 items-end"
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
          >
            <div
              className={cn("w-full rounded-t-[4px] transition-colors", hover === i ? "bg-electric" : "bg-electric/70")}
              style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      {hover !== null && (
        <div className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-2.5 py-1.5 text-[12px] text-white shadow-lg" style={{ left: `${((hover + 0.5) / data.length) * 100}%` }}>
          <div className="opacity-60">{formatDate(data[hover].date)}</div>
          <div className="font-medium tabular-nums">{formatCurrency(data[hover].value, "USD", 0)}</div>
        </div>
      )}
    </figure>
  );
}
