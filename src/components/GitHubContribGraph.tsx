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

const CELL = 14;
const GAP = 4;
const STEP = CELL + GAP;
const LABEL_W = 40;
const MONTH_H = 22;
const ROWS = 7;
const GRAPH_H = MONTH_H + ROWS * STEP;         // ~118px
const SKELETON_H = 32 + 16 + 16 + GRAPH_H + 32; // header + gaps + inner padding + graph + outer padding

export default function GitHubContribGraph() {
  const [data, setData] = useState<ContributionData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.deno.dev/SibhiSS.json?_=${Date.now()}`)
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => {});
  }, []);

  // Auto-scroll to the right so today's date is visible
  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  // Reserve exact space while loading to prevent layout shift
  if (!data) {
    return (
      <div
        className="bg-[#0d1117] rounded-xl border border-[#30363d] p-6 md:p-8 flex items-center justify-center"
        style={{ minHeight: SKELETON_H }}
      >
        <div className="text-[#8b949e] text-sm animate-pulse">Loading contributions…</div>
      </div>
    );
  }

  const weeks = data.contributions;

  // Month labels — placed at the first week of each new month
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
    <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-6 md:p-8">
      {/* Header */}
      <div className="mb-4">
        <span className="text-sm font-normal text-[#e6edf3]">
          {data.totalContributions} contributions in the last year
        </span>
      </div>

      {/* Graph scroll area */}
      <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
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
              fill="#8b949e"
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
              fill="#8b949e"
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
  );
}
