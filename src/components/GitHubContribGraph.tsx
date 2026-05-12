"use client";

import { useEffect, useState } from "react";

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
const DAY_LABELS = [
  { label: "", row: 0 },   // Sun
  { label: "Mon", row: 1 },
  { label: "", row: 2 },   // Tue
  { label: "Wed", row: 3 },
  { label: "", row: 4 },   // Thu
  { label: "Fri", row: 5 },
  { label: "", row: 6 },   // Sat
];

export default function GitHubContribGraph() {
  const [data, setData] = useState<ContributionData | null>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.deno.dev/SibhiSS.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-6 md:p-8 min-h-[180px] flex items-center justify-center">
        <div className="text-[#8b949e] text-sm">Loading contributions…</div>
      </div>
    );
  }

  // Build the grid: weeks as columns, days as rows (0=Sun, 6=Sat)
  const weeks = data.contributions; // already grouped by week

  // Determine month labels with positions
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIdx) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: weekIdx });
        lastMonth = month;
      }
    }
  });

  const CELL_SIZE = 11;
  const CELL_GAP = 3;
  const LABEL_WIDTH = 32;
  const MONTH_HEIGHT = 16;

  return (
    <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-6 md:p-8">
      {/* Header */}
      <div className="mb-5">
        <span className="text-sm font-normal text-[#e6edf3]">
          {data.totalContributions} contributions in the last year
        </span>
      </div>

      {/* Graph container */}
      <div className="w-full overflow-x-auto scrollbar-hide rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
        <div className="inline-flex flex-col" style={{ minWidth: weeks.length * (CELL_SIZE + CELL_GAP) + LABEL_WIDTH }}>
          {/* Month labels */}
          <div className="flex" style={{ paddingLeft: LABEL_WIDTH, height: MONTH_HEIGHT, marginBottom: 4 }}>
            {monthLabels.map((m, i) => (
              <span
                key={`${m.label}-${i}`}
                className="text-[11px] text-[#8b949e] leading-none absolute"
                style={{ left: LABEL_WIDTH + m.col * (CELL_SIZE + CELL_GAP), position: "absolute" }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid with day labels */}
          <div className="flex gap-0 relative" style={{ paddingLeft: LABEL_WIDTH }}>
            {/* Day labels */}
            <div className="flex flex-col absolute left-0 top-0" style={{ width: LABEL_WIDTH }}>
              {DAY_LABELS.map((d) => (
                <div
                  key={d.row}
                  className="text-[11px] text-[#8b949e] leading-none flex items-center"
                  style={{ height: CELL_SIZE + CELL_GAP }}
                >
                  {d.label}
                </div>
              ))}
            </div>

            {/* Contribution cells */}
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col" style={{ gap: CELL_GAP }}>
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const day = week[dayIdx];
                  if (!day) {
                    return <div key={dayIdx} style={{ width: CELL_SIZE, height: CELL_SIZE }} />;
                  }
                  return (
                    <div
                      key={dayIdx}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: LEVEL_COLORS[day.contributionLevel] || LEVEL_COLORS.NONE,
                        borderRadius: 2,
                        marginRight: CELL_GAP,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
