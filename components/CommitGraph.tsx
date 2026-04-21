import type { SVGProps } from "react";

const WEEKS = 53;
const DAYS = 7;

// Deterministic LCG so the pattern is stable between SSR and client.
function buildGrid(): number[][] {
  const grid: number[][] = [];
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const isWeekend = d === 0 || d === 6;
      // seasonal wave so the year has visible rhythm
      const seasonal = 0.3 + 0.5 * Math.abs(Math.sin((w / WEEKS) * Math.PI * 2));
      const v = rand() * (isWeekend ? 0.55 : 1) * seasonal;
      let lvl = 0;
      if (v > 0.48) lvl = 4;
      else if (v > 0.34) lvl = 3;
      else if (v > 0.20) lvl = 2;
      else if (v > 0.08) lvl = 1;
      col.push(lvl);
    }
    grid.push(col);
  }
  return grid;
}

const GRID = buildGrid();

const MOSS_CLASS = [
  "bg-moss-0",
  "bg-moss-1",
  "bg-moss-2",
  "bg-moss-3",
  "bg-moss-4",
];

const LEVEL_WORD = ["no", "a few", "some", "many", "lots of"];

export function CommitGraph() {
  const total = GRID.flat().reduce((n, lvl) => n + lvl, 0);

  return (
    <div className="font-mono text-[10.5px] text-bark-500">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="uppercase tracking-carved">
          commit sprout · last 53 weeks
        </span>
        <span className="tabular-nums">
          <span className="text-pine">{total}</span> contributions
        </span>
      </div>

      <div className="overflow-x-auto pb-1 pt-5">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateRows: `repeat(${DAYS}, 12px)`,
            gridAutoFlow: "column",
            gridAutoColumns: "12px",
            width: "max-content",
          }}
        >
          {GRID.flatMap((col, w) =>
            col.map((lvl, d) => (
              <div
                key={`${w}-${d}`}
                tabIndex={0}
                role="gridcell"
                aria-label={`week ${w + 1}, ${LEVEL_WORD[lvl]} commits`}
                title={`week ${w + 1} · ${LEVEL_WORD[lvl]} commits`}
                className={`commit-cell ${MOSS_CLASS[lvl]}`}
              >
                <SproutIcon className="sprout" />
              </div>
            ))
          )}
        </div>
      </div>

      <Legend />
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-3 flex items-center gap-2 text-[10px] uppercase
                    tracking-carved text-bark-500">
      <span>less</span>
      {MOSS_CLASS.map((cls, i) => (
        <span
          key={i}
          className={`${cls} h-3 w-3 rounded-[2px]`}
          aria-hidden="true"
        />
      ))}
      <span>more</span>
    </div>
  );
}

function SproutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22 V 13"
        stroke="#4F7E4F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 14 C 14 12 18 11 20 9 C 18 13 14 15 12 14 Z"
        fill="#7FA876"
        stroke="#4F7E4F"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 17 C 10 15 6 14 4 12 C 6 16 10 18 12 17 Z"
        fill="#8AA581"
        stroke="#4F7E4F"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CommitGraph;
