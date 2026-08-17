"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

const GAP = 8;

function columnCount(width: number): number {
  if (width < 480) return 2;
  if (width < 768) return 3;
  return 4;
}

type ColItem = { photo: Photo; originalIndex: number };

function buildColumns(photos: Photo[], containerWidth: number): ColItem[][] {
  const n = columnCount(containerWidth);
  const colWidth = Math.floor((containerWidth - GAP * (n - 1)) / n);
  const columns: ColItem[][] = Array.from({ length: n }, () => []);
  const heights = new Array<number>(n).fill(0);

  photos.forEach((photo, originalIndex) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push({ photo, originalIndex });
    heights[shortest] += Math.round((colWidth * photo.height) / photo.width) + GAP;
  });

  return columns;
}

export function MasonryGrid({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(Math.floor(entries[0].contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const columns = useMemo(
    () => buildColumns(photos, containerWidth),
    [photos, containerWidth],
  );

  const n = columnCount(containerWidth);
  const colWidth =
    containerWidth > 0
      ? Math.floor((containerWidth - GAP * (n - 1)) / n)
      : 0;

  const open = useCallback((idx: number) => setLightbox(idx), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null)),
    [],
  );
  const next = useCallback(
    () =>
      setLightbox((i) =>
        i !== null ? Math.min(photos.length - 1, i + 1) : null,
      ),
    [photos.length],
  );

  if (photos.length === 0) {
    return (
      <div className="oak-frame">
        <div className="oak-mat flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center sm:min-h-[320px] sm:p-10">
          <span className="oak-nameplate">board 00</span>
          <p className="font-serif text-3xl text-mahogany md:text-4xl">
            Nothing pinned yet
          </p>
          <p className="max-w-sm font-sans text-[14px] leading-relaxed text-bark-700">
            Add images to{" "}
            <code className="font-mono text-pine-700">public/moodboard/</code>{" "}
            and entries to{" "}
            <code className="font-mono text-pine-700">lib/moodboard.ts</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={containerRef} className="w-full">
        {containerWidth > 0 && (
          <div className="flex items-start" style={{ gap: GAP }}>
            {columns.map((col, ci) => (
              <div
                key={ci}
                className="flex flex-col"
                style={{ width: colWidth, gap: GAP }}
              >
                {col.map(({ photo, originalIndex }) => {
                  const h = Math.round((colWidth * photo.height) / photo.width);
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => open(originalIndex)}
                      aria-label={`View: ${photo.alt}`}
                      className="group relative w-full overflow-hidden rounded-lg
                                 focus-visible:outline-2 focus-visible:outline-offset-2
                                 focus-visible:outline-lantern"
                      style={{ height: h }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={`${colWidth}px`}
                        className="object-cover transition-transform duration-500
                                   group-hover:scale-[1.04]"
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-[80] flex items-center justify-center
                 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev();
        touchStartX.current = null;
      }}
    >
      <div
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          style={{
            maxWidth: "min(92vw, 1280px)",
            maxHeight: "82vh",
            width: "auto",
            height: "auto",
            display: "block",
            borderRadius: 8,
          }}
          draggable={false}
        />
        {photo.caption && (
          <p className="mt-3 max-w-lg text-center font-sans text-sm text-white/70">
            {photo.caption}
          </p>
        )}
      </div>

      {index > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full
                     bg-black/40 p-3 text-white/80 transition-colors
                     hover:bg-black/65 hover:text-white
                     focus-visible:outline-2 focus-visible:outline-white/60
                     sm:left-5"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}

      {index < photos.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full
                     bg-black/40 p-3 text-white/80 transition-colors
                     hover:bg-black/65 hover:text-white
                     focus-visible:outline-2 focus-visible:outline-white/60
                     sm:right-5"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-3 top-3 rounded-full bg-black/40 p-2
                   text-white/80 transition-colors hover:bg-black/65 hover:text-white
                   focus-visible:outline-2 focus-visible:outline-white/60
                   sm:right-5 sm:top-5"
      >
        <CloseIcon className="h-4 w-4" />
      </button>

      <div
        aria-live="polite"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full
                   bg-black/40 px-3 py-1 font-mono text-xs text-white/70"
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default MasonryGrid;