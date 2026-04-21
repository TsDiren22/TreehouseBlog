import Link from "next/link";
import { Treehouse } from "@/components/Treehouse";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 md:px-10">
      <Hero />
      <About />
      <RecentPosts />
      <ClosingLine />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative grid items-center gap-8 pt-8 pb-20
                        md:pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="relative flex flex-col items-start">
        <span className="eyebrow mb-4">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-pine align-middle" />
          diren &middot; dutch-turkish &middot; est. 2001
        </span>

        <h1 className="font-serif text-5xl leading-[1.05] text-mahogany md:text-6xl">
          Hi, I&rsquo;m Diren. A
          <span className="relative ml-2 inline-block">
            <span className="relative z-10 text-pine">software engineer</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full bg-lantern/60 blur-[2px]"
            />
          </span>
          {" "}working on my own projects.
        </h1>

        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bark-700 md:text-lg">
          Dutch-Turkish, born 4 August 2001. I write code for a living,
          build useful (and useless) tools for the fun of it, and keep notes on what
          I&rsquo;m learning.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/journal" className="btn-lantern">
            Read the journal
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="link-pine">
            or get in touch &rarr;
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-6 -z-10 rounded-full bg-lantern/30 blur-2xl"
        />
        <Treehouse className="h-auto w-full" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-10">
      <div className="oak-frame">
        <div className="oak-mat p-8 md:p-10">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-mahogany md:text-3xl">
              About me
            </h2>
            <span className="oak-nameplate">diren &middot; 24</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4 font-sans text-[15px] leading-relaxed text-bark-700">
              <p>
                I&rsquo;m a software engineer from the Netherlands with
                Turkish roots. I grew up between two languages, two cuisines,
                and one keyboard. Born on{" "}
                <span className="text-mahogany">4 August 2001</span>. I&rsquo;ve been near a computer for most of my life.
              </p>
              <p>
                Professionally I build software for a living. I like the work most when it&rsquo;s a mix of deep engineering and honest design.
                I also build projects for fun, and keep notes on what I&rsquo;m learning.
              </p>
              <p>
                On this site you&rsquo;ll find the{" "}
                <Link href="/journal" className="link-pine">journal</Link>{" "},
                short posts about what I&rsquo;m building and
                thinking, a list of{" "}
                <Link href="/projects" className="link-pine">projects</Link>,
                and a snapshot of what I&rsquo;m{" "}
                <Link href="/signals" className="link-pine">
                  currently coding
                </Link>
                . If any of it resonates,{" "}
                <Link href="/contact" className="link-pine">
                  get in touch
                </Link>
                .
              </p>
            </div>

            <aside className="flex flex-col gap-3">
              <p className="eyebrow">hobbies</p>
              <ul className="space-y-1.5 font-mono text-[13px] text-pine-700">
                <li>&middot; Music</li>
                <li>&middot; Football</li>
                <li>&middot; Gaming</li>
                <li>&middot; Cooking</li>
                <li>&middot; Working out</li>
                <li>&middot; Photography</li>
                <li>&middot; Learning new things</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentPosts() {
  return (
    <section id="journal" className="py-10">
      <header className="mb-8 flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">§ journal</p>
          <h2 className="mt-1 font-serif text-2xl text-mahogany md:text-3xl">
            Recent posts
          </h2>
        </div>
        <Link href="/journal" className="link-pine">
          go to journal &rarr;
        </Link>
      </header>

      <div className="oak-frame">
        <div className="oak-mat flex min-h-[260px] flex-col items-center justify-center gap-3 p-10 text-center">
          <span className="oak-nameplate">entry 00</span>
          <p className="font-serif text-3xl text-mahogany md:text-4xl">
            Coming soon
          </p>
          <p className="max-w-sm font-sans text-[14px] leading-relaxed text-bark-700">
            First posts aren&rsquo;t up yet. Check back later.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingLine() {
  return (
    <section className="py-8">
      <p className="mx-auto max-w-xl text-center font-serif text-lg leading-relaxed text-mahogany">
        If anything here was interesting, or you&rsquo;re working on
        something with cool that you want to share, {" "}
        <Link href="/contact" className="link-pine">
          drop me a line
        </Link>
        .
      </p>
    </section>
  );
}

function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
