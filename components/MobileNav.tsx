"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SVGProps } from "react";

const NAV_ITEMS: { href: string; label: string; file: string }[] = [
  { href: "/",         label: "About",    file: "about.mdx" },
  { href: "/projects", label: "Projects", file: "projects/" },
  { href: "/journal",  label: "Journal",  file: "journal/" },
  { href: "/signals",  label: "Signals",  file: "signals.tsx" },
  { href: "/contact",  label: "Contact",  file: "contact.mdx" },
];

function isActive(href: string, pathname: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const drawer = (
    <aside
      aria-hidden={!open}
      aria-label="Mobile navigation"
      className={`mobile-nav-panel md:hidden fixed inset-0 z-[60]
                  flex flex-col
                  transition-[opacity,transform] duration-300 ease-out ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none -translate-x-4 opacity-0"
                  }`}
    >
      <div className="flex items-center justify-between gap-3
                      border-b border-bark-300/40 px-4 py-2.5">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center
                     rounded-md ring-1 ring-mahogany/30 text-mahogany
                     transition-colors hover:bg-birch-shadow/40"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
        <div className="min-w-0 text-right">
          <p className="font-mono text-[10px] uppercase tracking-carved text-bark-500">
            Menu
          </p>
          <p className="mt-0.5 truncate font-serif text-base text-mahogany">
            diren
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  data-active={active ? "true" : "false"}
                  className="group flex items-baseline justify-between gap-3
                             rounded-md px-4 py-4
                             ring-1 ring-transparent transition-colors
                             hover:bg-birch-shadow/40
                             data-[active=true]:bg-lantern/25
                             data-[active=true]:ring-lantern/40"
                >
                  <span className="font-serif text-xl text-mahogany">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] text-pine-700 group-data-[active=true]:text-mahogany">
                    {item.file}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-bark-300/40 px-4 py-3">
        <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase
                      tracking-carved text-bark-500">
          <span className="flicker-dot inline-block h-1.5 w-1.5 rounded-full bg-lantern animate-flicker" />
          online
        </p>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="md:hidden inline-flex h-8 w-8 shrink-0 items-center justify-center
                   rounded-md ring-1 ring-mahogany/30 text-mahogany
                   transition-colors hover:bg-birch-shadow/40"
      >
        <HamburgerIcon className="h-4 w-4" />
      </button>

      {/* Portal the drawer to <body> so it escapes the breadcrumb's
          backdrop-filter containing block and can truly fill the viewport. */}
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}

function HamburgerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2 4h12" />
      <path d="M2 8h12" />
      <path d="M2 12h12" />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3.5 3.5l9 9" />
      <path d="M12.5 3.5l-9 9" />
    </svg>
  );
}

export default MobileNav;
