"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

const GAP = 4; // px between photos

type LayoutRow = {
  photos: Photo[];
  startIndex: number;
  height: number;
  widths: number[];
};

function targetRowHeight(containerWidth: number): number {
  if (containerWidth < 480) return 130;
  if (containerWidth < 768) return 170;
  return 220;
}

function buildRows(photos: Photo[], containerWidth: number): LayoutRow[] {
  if (containerWidth <= 0 || photos.length === 0) return [];

  const rowH = targetRowHeight(containerWidth);
  const rows: LayoutRow[] = [];
  let rowPhotos: Photo[] = [];
  let rowWidths: number[] = [];
  let rowTotalWidth = 0;
  let rowStart = 0;
  let globalIndex = 0;

  const finalizeRow = (isLast: boolean) => {
    const n = rowPhotos.length;
    if (n === 0) return;
    const totalWithGaps = rowTotalWidth + (n - 1) * GAP;
    if (isLast && totalWithGaps <= containerWidth) {
      rows.push({ photos: rowPhotos, startIndex: rowStart, height: rowH, widths: rowWidths });
    } else {
      const usable = containerWidth - (n - 1) * GAP;
      const scale = usable / rowTotalWidth;
      rows.push({
        photos: rowPhotos,
        startIndex: rowStart,
        height: rowH * scale,
        widths: rowWidths.map((w) => w * scale),
      });
    }
  };

  for (const photo of photos) {
    const sw = (photo.width / photo.height) * rowH;
    // Check if adding this photo would overflow the row
    const overflows =
      rowPhotos.length > 0 &&
      rowTotalWidth + sw + rowPhotos.length * GAP > containerWidth;

    if (overflows) {
      finalizeRow(false);
      rowStart = globalIndex;
      rowPhotos = [];
      rowWidths = [];
      rowTotalWidth = 0;
    }

    rowPhotos.push(photo);
    rowWidths.push(sw);
    rowTotalWidth += sw;
    globalIndex++;
  }

  finalizeRow(true);
  return rows;
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
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

  const rows = buildRows(photos, containerWidth);

  const openLightbox = useCallback((idx: number) => setLightbox(idx), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(
    () => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null)),
    [],
  );
  const nextPhoto = useCallback(
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
          <span className="oak-nameplate">roll 00</span>
          <p className="font-serif text-3xl text-mahogany md:text-4xl">
            No photos yet
          </p>
          <p className="max-w-sm font-sans text-[14px] leading-relaxed text-bark-700">
            Drop files into{" "}
            <code className="font-mono text-pine-700">public/photos/</code> and
            add entries to{" "}
            <code className="font-mono text-pine-700">lib/photos.ts</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={containerRef} className="w-full">
        {containerWidth > 0 &&
          rows.map((row, ri) => (
            <div
              key={ri}
              className="flex"
              style={{
                gap: GAP,
                marginBottom: ri < rows.length - 1 ? GAP : 0,
              }}
            >
              {row.photos.map((photo, pi) => {
                const photoIndex = row.startIndex + pi;
                const w = Math.round(row.widths[pi]);
                const h = Math.round(row.height);
                return (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => openLightbox(photoIndex)}
                    aria-label={`View photo: ${photo.alt}`}
                    className="group relative shrink-0 overflow-hidden rounded-sm
                               focus-visible:outline-2 focus-visible:outline-offset-2
                               focus-visible:outline-lantern"
                    style={{ width: w, height: h }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={`${w}px`}
                      className="object-cover transition-transform duration-500
                                 group-hover:scale-[1.04]"
                    />
                  </button>
                );
              })}
            </div>
          ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
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

  // Focus the close button when the lightbox opens
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Body scroll lock
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
      aria-label="Photo lightbox"
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
      {/* Image container — click inside doesn't close */}
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
            borderRadius: 3,
          }}
          draggable={false}
        />
        {photo.caption && (
          <p className="mt-3 max-w-lg text-center font-sans text-sm text-white/70">
            {photo.caption}
          </p>
        )}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full
                     bg-black/40 p-3 text-white/80 transition-colors
                     hover:bg-black/65 hover:text-white
                     focus-visible:outline-2 focus-visible:outline-white/60
                     sm:left-5"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}

      {/* Next */}
      {index < photos.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full
                     bg-black/40 p-3 text-white/80 transition-colors
                     hover:bg-black/65 hover:text-white
                     focus-visible:outline-2 focus-visible:outline-white/60
                     sm:right-5"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}

      {/* Close */}
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

      {/* Counter */}
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

export default PhotoGrid;