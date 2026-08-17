import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MasonryGrid } from "@/components/MasonryGrid";
import { moodboard } from "@/lib/moodboard";

export const metadata = {
  title: "Moodboard · Diren",
  description: "Things I find beautiful, interesting, or worth keeping.",
};

export default function MoodboardPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <PageHeader
        eyebrow="§ moodboard"
        title="Moodboard"
        lede="Things I find beautiful, interesting, or worth keeping."
      />
      <MasonryGrid photos={moodboard} />
      <SiteFooter />
    </div>
  );
}