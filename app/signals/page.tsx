import { CommitGraph } from "@/components/CommitGraph";
import { CodeBlock } from "@/components/CodeBlock";
import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Signals · Diren",
  description: "What I'm currently coding: commit activity and open files.",
};

const DEMO_CODE = `// a small treehouse utility
import { glow } from "./lantern";

type Room = "study" | "porch" | "nest";

const lantern = {
  color: "#FFB347",
  lit:   true,
};

function light(room: Room): boolean {
  if (!lantern.lit) return false;
  return glow(room) === lantern.color;
}

// warm every room, one by one
const rooms: Room[] = ["study", "porch", "nest"];
for (const r of rooms) light(r);
`;

export default function SignalsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 md:px-10">
      <PageHeader
        eyebrow="§ signals"
        title="What I'm working on"
        lede="A quick snapshot: my commit activity over the last year and a file I happen to have open right now. Updated whenever I remember to."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="oak-frame lg:col-span-3">
          <div className="oak-mat p-6 md:p-7">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-xl text-mahogany md:text-2xl">
                Commits
              </h2>
              <span className="oak-nameplate">last 12 months</span>
            </div>
            <CommitGraph />
          </div>
        </section>

        <section className="oak-frame lg:col-span-2">
          <div className="oak-mat p-6 md:p-7">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-xl text-mahogany md:text-2xl">
                Currently open
              </h2>
              <span className="oak-nameplate">typescript</span>
            </div>
            <CodeBlock
              code={DEMO_CODE}
              filename="lantern.ts"
              lang="typescript"
            />
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
