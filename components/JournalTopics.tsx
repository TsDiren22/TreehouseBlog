"use client";

import { useRef, type MouseEvent } from "react";
import { TOPIC_ICONS, type TopicIconKey } from "./topicIcons";

type Topic = {
  name: string;
  blurb: string;
  icon: TopicIconKey;
};

const TOPICS: Topic[] = [
  {
    name: "Angular",
    blurb: "A component-based framework for structured, opinionated single-page apps.",
    icon: "angular",
  },
  {
    name: "Java",
    blurb: "The object-oriented workhorse behind countless backend and enterprise systems.",
    icon: "java",
  },
  {
    name: "Machine Learning",
    blurb: "Teaching models to find patterns in data instead of hand-coding the rules.",
    icon: "ml",
  },
  {
    name: "Genetic Algorithms",
    blurb: "Evolution as optimization: mutate, select, and let the fittest solutions survive.",
    icon: "genetic",
  },
  {
    name: "Data Analytics",
    blurb: "Turning raw numbers into decisions. Cleaning, querying, and visualizing data.",
    icon: "data",
  },
  {
    name: "Python",
    blurb: "My go-to language for scripting, tooling, and most things machine learning.",
    icon: "python",
  },
  {
    name: "Generative AI",
    blurb: "Models that create text, images, code, and everything in between.",
    icon: "genai",
  },
  {
    name: "Neural Networks",
    blurb: "Layered networks of artificial neurons, and the deep learning built on top of them.",
    icon: "neural",
  },
];

export function JournalTopics() {
  return (
    <>
      <HandDrawnDefs />
      <ul
        role="list"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TOPICS.map((topic, i) => (
          <TopicCard key={topic.name} topic={topic} index={i} />
        ))}
      </ul>
    </>
  );
}

function TopicCard({ topic, index }: { topic: Topic; index: number }) {
  const ref = useRef<HTMLLIElement>(null);

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

  const figNumber = String(index + 1).padStart(2, "0");
  const IconComponent = TOPIC_ICONS[topic.icon];

  return (
    <li
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="schematic-card group"
    >
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
          filter="url(#handDrawnJournal)"
        />
      </svg>

      <span aria-hidden="true" className="lantern-spot" />

      <div className="relative z-20 block p-6 pt-7">
        <div className="flex items-center justify-between gap-3">
          <span className="icon-stamp">
            <IconComponent className="h-6 w-6" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-carved text-blueprint-ink/70">
            TOPIC {figNumber}
          </span>
        </div>

        <h3 className="mt-4 font-serif text-xl leading-tight text-mahogany">
          {topic.name}
        </h3>

        <p className="mt-3 font-sans text-[14px] leading-relaxed text-bark-700">
          {topic.blurb}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-blueprint-dim/60" />
          <span className="font-mono text-[10.5px] uppercase tracking-carved text-bark-500">
            no entries yet
          </span>
          <span aria-hidden="true" className="h-px flex-1 border-t border-dashed border-blueprint-dim/60" />
        </div>
      </div>
    </li>
  );
}

// SVG filter defs mounted once; every card's border references #handDrawnJournal.
function HandDrawnDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      className="pointer-events-none absolute"
    >
      <defs>
        <filter id="handDrawnJournal" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="2"
            seed="7"
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

export default JournalTopics;
