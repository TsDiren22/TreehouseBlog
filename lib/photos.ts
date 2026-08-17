export type Photo = {
  src: string;
  width: number;  // original pixel width — used for aspect ratio only
  height: number; // original pixel height — used for aspect ratio only
  alt: string;
  caption?: string;
};

// Drop files into public/photos/ and add an entry here.
// Only `width` and `height` matter for layout — they don't need to be exact,
// just the correct aspect ratio (e.g. 16:9 → width: 1600, height: 900).
export const photos: Photo[] = [
  { src: "/photos/20260720_074339(0).jpg", width: 4000, height: 3000, alt: "Photo — 20 Jul 2026" },
  { src: "/photos/20260720_101526.jpg", width: 4000, height: 3000, alt: "Photo — 20 Jul 2026" },
  { src: "/photos/20260720_102100.jpg", width: 4000, height: 3000, alt: "Photo — 20 Jul 2026" },
  { src: "/photos/20260720_102103.jpg", width: 4000, height: 3000, alt: "Photo — 20 Jul 2026" },
  { src: "/photos/20260721_170209.jpg", width: 4000, height: 3000, alt: "Photo — 21 Jul 2026" },
  { src: "/photos/20260721_202926.jpg", width: 4000, height: 3000, alt: "Photo — 21 Jul 2026" },
  { src: "/photos/20260722_132633.jpg", width: 4000, height: 3000, alt: "Photo — 22 Jul 2026" },
  { src: "/photos/20260722_161957.jpg", width: 4000, height: 3000, alt: "Photo — 22 Jul 2026" },
  { src: "/photos/20260723_113006.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2026" },
  { src: "/photos/20260723_142945.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2026" },
  { src: "/photos/20260723_144132.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2026" },
  { src: "/photos/20260723_154835.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2026" },
  { src: "/photos/20260725_170916.jpg", width: 4000, height: 3000, alt: "Photo — 25 Jul 2026" },
  { src: "/photos/20260725_201528.jpg", width: 4000, height: 3000, alt: "Photo — 25 Jul 2026" },
  { src: "/photos/20260729_152003(0).jpg", width: 4000, height: 3000, alt: "Photo — 29 Jul 2026" },
  { src: "/photos/20260729_163016.jpg", width: 4000, height: 3000, alt: "Photo — 29 Jul 2026" },
  { src: "/photos/20260729_171736.jpg", width: 4000, height: 3000, alt: "Photo — 29 Jul 2026" },
  { src: "/photos/20260730_152237.jpg", width: 4000, height: 3000, alt: "Photo — 30 Jul 2026" },
  { src: "/photos/20260730_172424.jpg", width: 4000, height: 3000, alt: "Photo — 30 Jul 2026" },
  { src: "/photos/PXL_20250718_085610115.jpg", width: 4000, height: 3000, alt: "Photo — 18 Jul 2025" },
  { src: "/photos/PXL_20250718_115657654.jpg", width: 3000, height: 4000, alt: "Photo — 18 Jul 2025" },
  { src: "/photos/PXL_20250719_162700366.jpg", width: 4000, height: 3000, alt: "Photo — 19 Jul 2025" },
  { src: "/photos/PXL_20250721_123129371.jpg", width: 4000, height: 3000, alt: "Photo — 21 Jul 2025" },
  { src: "/photos/PXL_20250721_123550880.jpg", width: 4000, height: 3000, alt: "Photo — 21 Jul 2025" },
  { src: "/photos/PXL_20250723_121235751.jpg", width: 3000, height: 4000, alt: "Photo — 23 Jul 2025" },
  { src: "/photos/PXL_20250723_152924344.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2025" },
  { src: "/photos/PXL_20250723_154238227.jpg", width: 4000, height: 3000, alt: "Photo — 23 Jul 2025" },
  { src: "/photos/PXL_20250911_132403241.jpg", width: 3000, height: 4000, alt: "Photo — 11 Sep 2025" },
  { src: "/photos/PXL_20250911_133846106.jpg", width: 4000, height: 3000, alt: "Photo — 11 Sep 2025" },
  { src: "/photos/PXL_20250912_181913892.jpg", width: 4000, height: 3000, alt: "Photo — 12 Sep 2025" },
  { src: "/photos/PXL_20250912_182921699.jpg", width: 4000, height: 3000, alt: "Photo — 12 Sep 2025" },
  { src: "/photos/PXL_20250916_162404605.jpg", width: 3000, height: 4000, alt: "Photo — 16 Sep 2025" },
  { src: "/photos/PXL_20250916_183539873.jpg", width: 3000, height: 4000, alt: "Photo — 16 Sep 2025" },
  { src: "/photos/PXL_20260104_093546527.jpg", width: 4000, height: 3000, alt: "Photo — 4 Jan 2026" },
  { src: "/photos/PXL_20260104_125244446.jpg", width: 3000, height: 4000, alt: "Photo — 4 Jan 2026" },
  { src: "/photos/PXL_20260104_125353090.jpg", width: 4000, height: 3000, alt: "Photo — 4 Jan 2026" },
  { src: "/photos/PXL_20260104_125604491.jpg", width: 3000, height: 4000, alt: "Photo — 4 Jan 2026" },
];
