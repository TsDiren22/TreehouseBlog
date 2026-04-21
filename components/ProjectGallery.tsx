"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import {
  HangingLanternIcon,
  PROJECT_ICONS,
  type ProjectIconKey,
} from "./projectIcons";

type Status = "seedling" | "budding" | "evergreen";

const STATUS_META: Record<Status, {
  emoji: string;
  label: string;
  className: string;
}> = {
  seedling: {
    emoji: "🌱",
    label: "Seedling",
    className: "bg-pine-50 text-pine-700 ring-pine-300/60",
  },
  budding: {
    emoji: "🌿",
    label: "Budding",
    className: "bg-lantern-soft/40 text-mahogany ring-lantern/60",
  },
  evergreen: {
    emoji: "🌳",
    label: "Evergreen",
    className: "bg-pine/10 text-pine-700 ring-pine/50",
  },
};

type Project = {
  name: string;
  blurb: string;
  stack: string;
  status: Status;
  icon: ProjectIconKey;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    name: "treehouse-api",
    blurb: "A tiny, opinionated REST kit for building cozy side-projects without the boilerplate.",
    stack: "TypeScript · Hono · SQLite",
    status: "budding",
    icon: "api",
    href: "#",
  },
  {
    name: "Fernpost",
    blurb: "A quiet, paper-feeling notes app with a garden of back-links and no algorithms.",
    stack: "Next.js · Tauri · SQLite",
    status: "budding",
    icon: "fern",
    href: "#",
  },
  {
    name: "Knotwork",
    blurb: "The design-token system these pages are carved from. Shared across every treehouse project.",
    stack: "TypeScript · Style Dictionary",
    status: "evergreen",
    icon: "knot",
    href: "#",
  },
  {
    name: "Hollow",
    blurb: "A cozy 2D exploration game about a fox with a lantern, wandering a sleeping forest.",
    stack: "Rust · wgpu · bevy",
    status: "seedling",
    icon: "fox",
    href: "#",
  },
  {
    name: "Lanternd",
    blurb: "A very small daemon that keeps the lights on. Health-checks, restarts, a little logging.",
    stack: "Go · systemd",
    status: "evergreen",
    icon: "lantern",
    href: "#",
  },
  {
    name: "Needles",
    blurb: "A parser-combinator library with pine-needle-thin stack frames and kind error messages.",
    stack: "Rust · no_std",
    status: "seedling",
    icon: "needles",
    href: "#",
  },
];

export function ProjectGallery() {
  return (
    <>
      <HandDrawnDefs />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </ul>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLLIElement>(null);

  // Track the cursor via CSS custom properties; the .lantern-spot gradient
  // reads --mx / --my to move with the pointer.
  const onMove = (e: MouseEvent<HTMLLIElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "-9999px");
    el.style.setProperty("--my", "-9999px");
  };

  const status = STATUS_META[project.status];
  const figNumber = String(index + 1).padStart(2, "0");
  const IconComponent = PROJECT_ICONS[project.icon];

  return (
    <li
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="schematic-card group"
    >
      <span aria-hidden="true" className="schematic-pin" />

      <span aria-hidden="true" className="card-lantern">
        <HangingLanternIcon className="h-[58px] w-[34px]" />
      </span>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full text-mahogany/55"
        preserveAspectRatio="none"
        viewBox="0 0 200 200"
      >
        <rect
          x="2"
          y="2"
          width="196"
          height="196"
          rx="8"
          ry="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          filter="url(#handDrawn)"
        />
      </svg>

      <RulerTicks />

      <span aria-hidden="true" className="lantern-spot" />

      <Link
        href={project.href ?? "#"}
        className="relative z-20 block p-6 pt-7 focus:outline-none"
      >
        <div className="flex items-center justify-between gap-3">
          <StatusPill status={project.status} />
          <span className="font-mono text-[10px] uppercase tracking-carved text-blueprint-ink/70">
            FIG. {figNumber}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="icon-stamp">
            <IconComponent className="h-6 w-6" />
          </span>
          <h3 className="font-serif text-xl leading-tight text-mahogany">
            {project.name}
          </h3>
        </div>

        <p className="mt-3 font-sans text-[14px] leading-relaxed text-bark-700">
          {project.blurb}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-blueprint-dim/60" />
          <span className="font-mono text-[11px] uppercase tracking-carved text-blueprint-ink/80">
            stack
          </span>
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-blueprint-dim/60" />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[12px] text-pine-700">
            {project.stack}
          </span>
          <ArrowIcon className="h-4 w-4 text-bark-500 transition group-hover:text-lantern-hot" />
        </div>

        <span
          aria-label={`${status.label}. ${project.name}`}
          className="sr-only"
        >
          status: {status.label}
        </span>
      </Link>
    </li>
  );
}

function StatusPill({ status }: { status: Status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5",
        "font-mono text-[10.5px] uppercase tracking-carved ring-1",
        meta.className,
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-[13px] leading-none">
        {meta.emoji}
      </span>
      {meta.label}
    </span>
  );
}

function RulerTicks() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-2 top-10 bottom-10 z-10 w-3 text-blueprint-dim/70"
      preserveAspectRatio="none"
      viewBox="0 0 12 200"
    >
      {Array.from({ length: 11 }).map((_, i) => {
        const y = (i * 200) / 10;
        const long = i % 5 === 0;
        return (
          <line
            key={i}
            x1="0"
            x2={long ? 10 : 6}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeWidth={long ? 1.2 : 0.8}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

// SVG filter defs mounted once; every card's border references #handDrawn.
function HandDrawnDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      className="pointer-events-none absolute"
    >
      <defs>
        <filter id="handDrawn" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default ProjectGallery;
