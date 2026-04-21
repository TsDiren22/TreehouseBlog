import { PageHeader } from "@/components/PageHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Contact · Diren",
  description: "How to reach Diren: email, GitHub, LinkedIn.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 md:px-10">
      <PageHeader
        eyebrow="§ contact"
        title="Get in touch"
        lede="Easiest way to reach me is email. I usually reply within a day or two. Happy to hear about interesting problems, or just to say hi."
      />

      <div className="oak-frame">
        <div className="oak-mat p-8 md:p-10">
          <dl className="grid gap-5 md:grid-cols-2">
            {/* add email row */}
            <ContactRow
              label="email"
              value=""
              href=""
            />
            <ContactRow label="github"   value="@TsDiren22	"     href="https://github.com/TsDiren22" />
            <ContactRow label="linkedin" value="Onur Diren Öztürk"  href="https://www.linkedin.com/in/onur-diren-öztürk-7948ba141/?locale=en_US" />
            <ContactRow label="based in" value="The Netherlands" />
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="mailto:" className="btn-lantern">
               	{/* add email here */}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-carved text-bark-500">
              &mdash; replies within a day or two
            </span>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="eyebrow">{label}</dt>
      <dd className="font-mono text-[14px] text-mahogany">
        {href ? (
          <a href={href} className="link-pine">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
