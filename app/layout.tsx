import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import "./globals.css";

// Runs in <head> before first paint. Applies the saved theme synchronously
// so the moonlit overrides don't flash after hydration.
const THEME_BOOTSTRAP = `
(function () {
  try {
    var saved = localStorage.getItem("tree:mode");
    var mode = saved === "moonlit" ? "moonlit" : "lit";
    document.documentElement.dataset.theme = mode;
  } catch (e) {
    document.documentElement.dataset.theme = "lit";
  }
})();
`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Diren | Software Engineer",
  description:
    "Personal site of Diren. A Dutch-Turkish software engineer, building projects for fun.",
};

export const viewport: Viewport = {
  themeColor: "#EED9B1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="relative antialiased">
        <div aria-hidden="true" className="page-surface" />
        <div
          aria-hidden="true"
          className="ambient-lit pointer-events-none fixed inset-0 -z-10
                     bg-lantern-glow opacity-60 transition-opacity duration-700"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
        <div
          aria-hidden="true"
          className="ambient-moon pointer-events-none fixed inset-0 -z-10
                     opacity-0 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(203,213,209,0.28) 0%, rgba(43,59,71,0.25) 45%, rgba(15,24,36,0.75) 95%)",
            transform: "translateZ(0)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />

        <div className="relative z-10 flex min-h-screen">
          <Sidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <Breadcrumb />
            <main className="workspace relative flex-1">{children}</main>
          </div>
        </div>

        <GrainOverlay />
      </body>
    </html>
  );
}
