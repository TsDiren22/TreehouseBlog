import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PhotoGrid } from "@/components/PhotoGrid";
import { photos } from "@/lib/photos";

export const metadata = {
  title: "Photography · Diren",
  description: "Moments caught by my own lens.",
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <PageHeader
        eyebrow="§ photography"
        title="Photography"
        lede={[
          "Moments caught by my own lens.",
          "One of my favorite hobbies is photography, and I love capturing moments that I find beautiful or interesting. When I see a sight that inspires me, I take a photo of it.",
          "I hope you enjoy these moments as much as I do.",
        ]}
      />
      <PhotoGrid photos={photos} />
      <SiteFooter />
    </div>
  );
}