export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-10 flex flex-col gap-3">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="font-serif text-4xl leading-tight text-mahogany md:text-5xl">
        {title}
      </h1>
      {lede && (
        <p className="max-w-2xl font-sans text-[15px] leading-relaxed text-bark-700 md:text-base">
          {lede}
        </p>
      )}
    </header>
  );
}

export default PageHeader;
