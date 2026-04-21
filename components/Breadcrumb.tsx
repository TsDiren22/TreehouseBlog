"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LanternToggle } from "./LanternToggle";
import { MobileNav } from "./MobileNav";

export type Crumb = {
  label: string;
  href?: string;
};

const ROUTE_CRUMBS: Record<string, Crumb[]> = {
  "/":         [{ label: "about.mdx" }],
  "/projects": [{ label: "projects" }],
  "/journal":  [{ label: "journal" }],
  "/signals":  [{ label: "signals.tsx" }],
  "/contact":  [{ label: "contact.mdx" }],
};

function crumbsFor(pathname: string): Crumb[] {
  const root: Crumb = { label: "Diren", href: "/" };
  const match = Object.keys(ROUTE_CRUMBS).find((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );
  const tail = match ? ROUTE_CRUMBS[match] : [{ label: "404.md" }];
  return [root, ...tail];
}

export function Breadcrumb() {
  const pathname = usePathname() ?? "/";
  const crumbs = crumbsFor(pathname);

  return (
    <header
      className="sticky top-0 z-30
                 border-b border-bark-300/40
                 bg-birch-light/75 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 px-4 py-2.5 md:px-6">
        <MobileNav />

        <span className="hidden items-center gap-1.5 md:flex">
          <Dot className="bg-mahogany/70" />
          <Dot className="bg-pine/70" />
          <Dot className="bg-lantern/80" />
        </span>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-1 items-center
                     font-mono text-[12.5px] leading-none
                     text-bark-700"
        >
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <Fragment key={`${crumb.label}-${i}`}>
                {i > 0 && <Separator />}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="truncate text-mahogany
                               drop-shadow-[0_0_6px_rgba(255,179,71,0.55)]"
                  >
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="truncate text-pine-700 transition-colors
                               hover:text-lantern-hot"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="truncate text-bark-700">{crumb.label}</span>
                )}
              </Fragment>
            );
          })}
        </nav>

        <span className="hidden font-mono text-[11px] uppercase tracking-carved
                         text-bark-500 md:inline">
          UTF-8 &middot; LF
        </span>

        <LanternToggle />
      </div>
    </header>
  );
}

function Separator() {
  return (
    <span aria-hidden="true" className="mx-2 select-none text-bark-500/70">
      /
    </span>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2.5 w-2.5 rounded-full ring-1 ring-mahogany/30 ${className}`}
    />
  );
}

function Fragment({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default Breadcrumb;
