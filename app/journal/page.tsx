import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JournalTopics } from "@/components/JournalTopics";

export const metadata = {
  title: "Journal · Diren",
  description: "Short blog posts about software, AI, and what I'm learning.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <PageHeader
        eyebrow="§ journal"
        title="Journal"
        lede="I'm planning to write here. Short posts about software, AI, and whatever I'm learning. Nothing's published yet."
      />

      <JournalTopics />

      <SiteFooter />
    </div>
  );
}
