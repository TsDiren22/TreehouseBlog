export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string | string[];
}) {
  const ledeParagraphs = Array.isArray(lede) ? lede : lede ? [lede] : [];

  return (
    <header className="mb-8 flex flex-col gap-3 sm:mb-10">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="font-serif text-[2rem] leading-tight text-mahogany sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {ledeParagraphs.map((paragraph, index) => (
        <p
          key={index}
          className="max-w-2xl font-sans text-[15px] leading-relaxed text-bark-700 md:text-base"
        >
          {paragraph}
        </p>
      ))}
    </header>
  );
}

export default PageHeader;
