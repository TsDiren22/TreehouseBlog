import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SpotifyShowcase } from "@/components/SpotifyShowcase";

export const metadata = {
  title: "Signals · Diren",
  description: "The Spotify playlist currently on repeat while I build things.",
};

export default function SignalsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 sm:px-6 sm:py-10 md:px-10">
      <PageHeader
        eyebrow="§ signals"
        title="On Repeat"
        lede="Forget commit graphs — here's the playlist that's actually been running on loop while I build this site."
      />

      <SpotifyShowcase />

      <SiteFooter />
    </div>
  );
}
