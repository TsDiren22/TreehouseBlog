"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronIcon,
  TwigIcon,
  TwigOpenIcon,
  iconForFile,
} from "./icons";

type FileNode = {
  name: string;
  kind: "file" | "folder";
  href?: string;
  children?: FileNode[];
};

const TREE: FileNode[] = [
  {
    name: "diren/",
    kind: "folder",
    children: [
      { name: "about.mdx", kind: "file", href: "/" },

      {
        name: "journal/",
        kind: "folder",
        href: "/journal",
        children: [
          { name: "coming-soon.md", kind: "file", href: "/journal" },
        ],
      },

      {
        name: "projects/",
        kind: "folder",
        href: "/projects",
        children: [
          { name: "coming-soon.md", kind: "file", href: "/projects" },
        ],
      },

      { name: "signals.tsx", kind: "file", href: "/signals" },
      { name: "contact.mdx", kind: "file", href: "/contact" },
      { name: "README.md",   kind: "file", href: "/" },
    ],
  },
];

function isActive(href: string | undefined, pathname: string): boolean {
  if (!href) return false;
  const [path] = href.split("#");
  return path === pathname;
}

function containsActive(node: FileNode, pathname: string): boolean {
  if (isActive(node.href, pathname)) return true;
  return (node.children ?? []).some((c) => containsActive(c, pathname));
}

export function Sidebar() {
  const pathname = usePathname() ?? "/";

  return (
    <aside
      className="app-sidebar wood-seam hidden md:flex md:flex-col
                 md:sticky md:top-0 md:h-screen
                 w-[260px] shrink-0
                 bg-birch-light/60 backdrop-blur-[1px]"
    >
      <ExplorerHeader />
      <nav
        aria-label="Site navigation"
        className="flex-1 overflow-y-auto px-2 py-2"
      >
        <ul className="space-y-0.5">
          {TREE.map((node) => (
            <TreeNode
              key={node.name}
              node={node}
              depth={0}
              pathname={pathname}
              defaultOpen
            />
          ))}
        </ul>
      </nav>
      <SidebarFooter />
    </aside>
  );
}

function ExplorerHeader() {
  return (
    <div className="border-b border-bark-300/40 px-4 pt-4 pb-3">
      <p className="font-mono text-[10px] uppercase tracking-carved text-bark-500">
        Explorer
      </p>
      <p className="mt-0.5 font-serif text-base text-mahogany">diren</p>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-bark-300/40 px-4 py-3">
      <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase
                    tracking-carved text-bark-500">
        <span className="flicker-dot inline-block h-1.5 w-1.5 rounded-full bg-lantern animate-flicker" />
        online
      </p>
    </div>
  );
}

function TreeNode({
  node,
  depth,
  pathname,
  defaultOpen = false,
}: {
  node: FileNode;
  depth: number;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const shouldDefaultOpen = useMemo(() => {
    if (defaultOpen) return true;
    return containsActive(node, pathname);
  }, [defaultOpen, node, pathname]);

  const [open, setOpen] = useState(shouldDefaultOpen);
  const indent = { paddingLeft: 6 + depth * 12 };

  if (node.kind === "folder") {
    const Icon = open ? TwigOpenIcon : TwigIcon;
    const active = isActive(node.href, pathname);

    return (
      <li>
        <div className="flex items-stretch">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? `Collapse ${node.name}` : `Expand ${node.name}`}
            className="flex shrink-0 items-center rounded-md px-1 py-1
                       hover:bg-birch-shadow/40"
            style={{ paddingLeft: indent.paddingLeft }}
          >
            <ChevronIcon open={open} className="h-3 w-3 text-bark-500" />
          </button>

          {node.href ? (
            <Link
              href={node.href}
              className="tree-row min-w-0 flex-1"
              data-active={active ? "true" : "false"}
            >
              <Icon className="h-4 w-4 text-pine shrink-0" />
              <span className="truncate">{node.name}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="tree-row min-w-0 flex-1 text-left"
            >
              <Icon className="h-4 w-4 text-pine shrink-0" />
              <span className="truncate">{node.name}</span>
            </button>
          )}
        </div>

        {open && node.children && (
          <ul className="space-y-0.5">
            {node.children.map((child) => (
              <TreeNode
                key={child.name}
                node={child}
                depth={depth + 1}
                pathname={pathname}
                defaultOpen={false}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  const FileIcon = iconForFile(node.name);
  const active = isActive(node.href, pathname);

  const row = (
    <span
      className="tree-row"
      data-active={active ? "true" : "false"}
      style={indent}
    >
      <span className="inline-block h-3 w-3" aria-hidden="true" />
      <FileIcon
        className={
          active
            ? "h-4 w-4 text-lantern-hot drop-shadow-lantern"
            : "h-4 w-4 text-pine-500"
        }
      />
      <span className="truncate">{node.name}</span>
    </span>
  );

  return (
    <li>
      {node.href ? (
        <Link href={node.href} className="block">
          {row}
        </Link>
      ) : (
        row
      )}
    </li>
  );
}

export default Sidebar;
