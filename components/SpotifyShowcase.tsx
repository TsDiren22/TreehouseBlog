"use client";

import { useEffect, useState } from "react";
import { TRACKS, type Track } from "@/lib/spotifyTracks";

// Fetched once via https://open.spotify.com/oembed?url=<playlist-url> — update
// PLAYLIST below if the featured playlist ever changes.
const PLAYLIST = {
  title: "HipHop R&B",
  url: "https://open.spotify.com/playlist/391AbISP5OJd1rqdzkGGgt",
  embedSrc: "https://open.spotify.com/embed/playlist/391AbISP5OJd1rqdzkGGgt?utm_source=oembed",
};

function randomTrack(excludeId?: string): Track {
  if (TRACKS.length <= 1) return TRACKS[0];
  let next: Track;
  do {
    next = TRACKS[Math.floor(Math.random() * TRACKS.length)];
  } while (next.id === excludeId);
  return next;
}

export function SpotifyShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:items-center">
      <div className="flex justify-center lg:col-span-2">
        <Turntable />
      </div>

      <div className="lg:col-span-3">
        <div className="oak-frame">
          <div className="oak-mat p-5 sm:p-6 md:p-7">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="oak-nameplate">on repeat</span>
              <span className="font-mono text-[10px] uppercase tracking-carved text-bark-500">
                spotify · playlist
              </span>
            </div>

            <h2 className="font-serif text-2xl text-mahogany md:text-3xl">
              {PLAYLIST.title}
            </h2>
            <p className="mt-2 mb-5 font-sans text-[14px] leading-relaxed text-bark-700">
              The playlist that&rsquo;s been running on loop while this site got built. Hit play.
            </p>

            <iframe
              title={`Spotify playlist: ${PLAYLIST.title}`}
              src={PLAYLIST.embedSrc}
              width="100%"
              height="352"
              style={{ borderRadius: 12 }}
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />

            <a
              href={PLAYLIST.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-pine mt-4 inline-flex items-center gap-1"
            >
              open in Spotify &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

type Phase = "idle" | "leaving" | "entering";

function Turntable() {
  // Starts on TRACKS[0] so server and client render the same markup, then
  // swaps to a random track once mounted (Math.random() during SSR would
  // desync from the client and trigger a hydration mismatch).
  const [current, setCurrent] = useState<Track>(TRACKS[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setCurrent(randomTrack(TRACKS[0].id));

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleClick = () => {
    if (reducedMotion) {
      setCurrent((prev) => randomTrack(prev.id));
      return;
    }
    if (phase !== "idle") return;
    setPhase("leaving");
  };

  const handleAnimationEnd = () => {
    if (phase === "leaving") {
      setCurrent((prev) => randomTrack(prev.id));
      setPhase("entering");
    } else if (phase === "entering") {
      setPhase("idle");
    }
  };

  const discClass =
    phase === "leaving"
      ? "animate-disc-throw"
      : phase === "entering"
        ? "animate-disc-enter"
        : "animate-[spin_9s_linear_infinite] motion-reduce:animate-none";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="plank relative flex h-[260px] w-[260px] items-center justify-center sm:h-[300px] sm:w-[300px]">
        <button
          type="button"
          onClick={handleClick}
          aria-label="Skip to a random track"
          className="group relative h-[190px] w-[190px] rounded-full
                     focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern
                     sm:h-[220px] sm:w-[220px]"
        >
          <div
            key={current.id}
            onAnimationEnd={handleAnimationEnd}
            className={`absolute inset-0 rounded-full ${discClass}`}
            style={{
              background: "#1F110F",
              backgroundImage:
                "repeating-radial-gradient(circle at center, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 6px)",
              boxShadow: "0 10px 24px -8px rgba(31,17,15,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2
                            overflow-hidden rounded-full ring-2 ring-lantern/70
                            transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.art}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-birch-light" />
          </div>
        </button>

        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -right-1 -top-1 h-24 w-24 sm:h-28 sm:w-28"
        >
          <circle cx="82" cy="18" r="7" fill="#5A4229" />
          <line x1="82" y1="18" x2="40" y2="58" stroke="#5A4229" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="58" r="4.5" fill="#3A2120" />
        </svg>
      </div>

      <div className="flex max-w-[240px] flex-col items-center gap-1.5 text-center">
        <p className="font-serif text-base leading-tight text-mahogany sm:text-lg">
          {current.title}
        </p>
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-pine text-xs"
        >
          open in Spotify &rarr;
        </a>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-carved text-bark-500">
          click the record for another
        </p>
      </div>
    </div>
  );
}

export default SpotifyShowcase;
