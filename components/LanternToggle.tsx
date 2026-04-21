"use client";

import { useEffect, useState } from "react";

type Mode = "lit" | "moonlit";
const STORAGE_KEY = "tree:mode";

export function LanternToggle() {
  // Start in `lit` so SSR and first client render agree; the bootstrap
  // script in layout.tsx has already set the real attribute before paint.
  const [mode, setMode] = useState<Mode>("lit");

  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Mode | undefined) ?? "lit";
    setMode(current);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "lit" ? "moonlit" : "lit";
    setMode(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore (private mode, quota, etc.)
    }
  };

  const on = mode === "lit";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Dim the lantern" : "Light the lantern"}
      aria-pressed={on}
      data-on={on ? "true" : "false"}
      className="lantern-toggle"
      title={on ? "Lantern is lit.  Click to dim" : "Lantern is out. Click to light"}
    >
      <LanternSvg />
    </button>
  );
}

function LanternSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <path d="M12 1.5v2" />
      <circle cx="12" cy="1.8" r="0.6" />
      <path d="M8 5h8l-1 3H9L8 5Z" />
      <rect x="7.2" y="8" width="9.6" height="9.5" rx="1.8" />
      <path d="M10 9.5v6.5M14 9.5v6.5" opacity="0.55" />
      <path
        d="M12 10.2c1 0 2 1 2 2.3 0 1.4-1 2.5-2 2.5s-2-1.1-2-2.5c0-1.3 1-2.3 2-2.3Z"
        fill="currentColor"
        stroke="none"
        className="opacity-90"
      />
      <path d="M10 18h4" />
    </svg>
  );
}

export default LanternToggle;
