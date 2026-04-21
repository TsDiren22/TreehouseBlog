import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Journal · Diren",
  description: "Short blog posts about software, AI, and what I'm learning.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 md:px-10">
      <PageHeader
        eyebrow="§ journal"
        title="Journal"
        lede="I'm planning to write here. Short posts about software, AI, and whatever I'm learning. Nothing's published yet."
      />

      <div className="oak-frame">
        <div className="oak-mat flex min-h-[320px] flex-col items-center justify-center gap-3 p-10 text-center">
          <span className="oak-nameplate">entry 00</span>
          <p className="font-serif text-3xl text-mahogany md:text-4xl">
            Coming soon
          </p>
          <p className="max-w-sm font-sans text-[14px] leading-relaxed text-bark-700">
            Check back later.
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
