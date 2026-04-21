import type { SVGProps } from "react";

export function TwigIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M2 12c3-1 5-3 6-6" />
      <path d="M6 9c1 0 2 .3 2.5 1" />
      <path d="M9 6c.8-.1 1.6.1 2 .7" />
      <circle cx="8.2" cy="6.1" r="1.1" fill="currentColor" className="opacity-70" />
    </svg>
  );
}

export function TwigOpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M2 13c3-1 5-3 6-6" />
      <path d="M7 10c1-1.5 2-2 3.5-2" />
      <path d="M11 4c1 .5 1.7 1.3 1.9 2.5C11.7 7 10.7 6.8 10 6c-.6-.7-.5-1.6 1-2Z"
            fill="currentColor" className="opacity-60"/>
    </svg>
  );
}

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M12.5 3.5C9 3 4 5 3 9.5c-.3 1.3.4 2.7 1.7 3
              4.5 1 8-4 7.8-9Z"
            fill="currentColor" className="opacity-20"/>
      <path d="M12.5 3.5C9 3 4 5 3 9.5c-.3 1.3.4 2.7 1.7 3
              4.5 1 8-4 7.8-9Z" />
      <path d="M4.5 12.5C7 9.5 9.5 6.5 12 4" />
    </svg>
  );
}

export function NeedleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M8 14V5" />
      <path d="M8 8 5 5.5" />
      <path d="M8 8l3-2.5" />
      <path d="M8 10.5 5 8" />
      <path d="M8 10.5 11 8" />
      <path d="M8 5c0-1.2.6-2 2-2.5" />
      <path d="M8 5c0-1.2-.6-2-2-2.5" />
    </svg>
  );
}

export function ScrollIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M4 3h6l2 2v8H4z"
            fill="currentColor" className="opacity-15" />
      <path d="M4 3h6l2 2v8H4z" />
      <path d="M10 3v2h2" />
      <path d="M6 8h4M6 10.5h4" />
    </svg>
  );
}

export function ChevronIcon({ open, ...rest }: SVGProps<SVGSVGElement> & { open?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
         {...rest}>
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function iconForFile(name: string) {
  if (/\.(ts|tsx|js|jsx)$/i.test(name)) return NeedleIcon;
  if (/\.(md|mdx|txt)$/i.test(name))    return ScrollIcon;
  return LeafIcon;
}
