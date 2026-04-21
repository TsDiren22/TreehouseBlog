export function SiteFooter() {
  return (
    <footer className="mt-20 flex items-center justify-between border-t border-bark-300/40 pt-6 pb-2">
      <p className="font-mono text-[11px] uppercase tracking-carved text-bark-500">
        &copy; {new Date().getFullYear()} · diren
      </p>
      <p className="font-mono text-[11px] text-bark-500">
        <span className="flicker-dot mr-1 inline-block h-1.5 w-1.5 rounded-full bg-lantern align-middle animate-flicker" />
        online
      </p>
    </footer>
  );
}

export default SiteFooter;
