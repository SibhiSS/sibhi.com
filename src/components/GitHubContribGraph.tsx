"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

interface ContributionData {
  contributions: ContributionDay[][];
  totalContributions: number;
}

// GitHub dark-mode color mapping
const LEVEL_COLORS: Record<string, string> = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Scale based on screen width (approximate)
const CELL = 14;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_W = 49;
const MONTH_H = 20;
const ROWS = 7;
const GRAPH_H = MONTH_H + ROWS * STEP; 
const SKELETON_H = 32 + 16 + 16 + GRAPH_H + 32;

export default function GitHubContribGraph() {
  const [data, setData] = useState<ContributionData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.deno.dev/SibhiSS.json?_=${Date.now()}`)
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => {});
  }, []);

  // Auto-scroll to the right on load
  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  if (!data) {
    return (
      <div
        className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-8 flex items-center justify-center"
        style={{ minHeight: SKELETON_H }}
      >
        <div className="text-white/30 text-sm animate-pulse">Loading contributions…</div>
      </div>
    );
  }

  const weeks = data.contributions;
  const monthLabels: { label: string; col: number }[] = [];
  let prev = -1;
  weeks.forEach((week, i) => {
    const d = week[0];
    if (!d) return;
    const m = new Date(d.date).getMonth();
    if (m !== prev) {
      monthLabels.push({ label: MONTHS[m], col: i });
      prev = m;
    }
  });

  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.01] p-6 md:p-8 overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <span className="text-sm font-light text-white/60">
          {data.totalContributions} contributions in the last year
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 hidden md:block">
          SibhiSS Activity
        </span>
      </div>

      {/* Graph Area with Horizontal Scroll */}
      <div className="relative group">
        <div 
          ref={scrollRef} 
          className="w-full overflow-x-auto scrollbar-hide rounded-xl border border-white/[0.04] bg-black/20 p-4 md:p-6 cursor-grab active:cursor-grabbing"
        >
          <div className="inline-block">
            <svg
              width={LABEL_W + weeks.length * STEP}
              height={GRAPH_H}
              className="block"
            >
              {/* Month labels */}
              {monthLabels.map((m, i) => (
                <text
                  key={`m-${i}`}
                  x={LABEL_W + m.col * STEP}
                  y={12}
                  fill="rgba(255,255,255,0.25)"
                  fontSize={11}
                  fontFamily="inherit"
                >
                  {m.label}
                </text>
              ))}

              {/* Day labels (Mon / Wed / Fri) */}
              {[1, 3, 5].map((row) => (
                <text
                  key={`d-${row}`}
                  x={0}
                  y={MONTH_H + row * STEP + CELL - 1}
                  fill="rgba(255,255,255,0.25)"
                  fontSize={11}
                  fontFamily="inherit"
                >
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][row]}
                </text>
              ))}

              {/* Contribution cells */}
              {weeks.map((week, wi) =>
                week.map((day, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={LABEL_W + wi * STEP}
                    y={MONTH_H + di * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    ry={2}
                    fill={LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE}
                  >
                    <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
                  </rect>
                ))
              )}
            </svg>
          </div>
        </div>
        
        {/* Scroll Hints (Shadows) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
