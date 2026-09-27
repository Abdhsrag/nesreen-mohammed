import type { Metadata, Viewport } from "next";
import { Cairo, Marhey } from "next/font/google";
import StyledJsxRegistry from "./registry";
import "./globals.css";

const cairo = Cairo({ subsets: ["latin"], variable: "--font-cairo", display: "swap" });
const marhey = Marhey({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#9b24e8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nesreen-mohammed.art"),
  title: "Nesreen Mohammed | Creative Portfolio — Illustrator & Graphic Designer",
  description:
    "Official 2025-2026 Creative Portfolio of Nesreen Mohammed. Specializing in illustration, character design, brand visual identity, and motion graphic storyboards.",
  keywords: [
    "Nesreen Mohammed",
    "Nesreena",
    "Illustrator",
    "Graphic Designer",
    "Character Design",
    "Storyboarding",
    "Branding",
    "Egypt",
    "Motion Graphics",
    "WE Schools",
  ],
  authors: [{ name: "Nesreen Mohammed" }],
  creator: "Nesreen Mohammed",
  alternates: {
    canonical: "https://nesreen-mohammed.art",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Nesreen Mohammed | Creative Portfolio (2025 - 2026)",
    description:
      "Explore 50 presentation slides of commercial branding, packaging, character design, and motion graphics by Nesreen Mohammed.",
    url: "https://nesreen-mohammed.art",
    siteName: "Nesreen Mohammed Portfolio",
    images: [
      {
        url: "/slides/slide-01.webp",
        width: 1920,
        height: 1080,
        alt: "Nesreen Mohammed Portfolio Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nesreen Mohammed | Creative Portfolio",
    description:
      "Illustration, character design, motion graphics, and brand visual identity.",
    images: ["/slides/slide-01.webp"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nesreen-mohammed.art/#person",
      name: "Nesreen Mohammed",
      alternateName: "Nesreena",
      jobTitle: "Illustrator & Graphic Designer",
      description:
        "Digital Illustrator & Visual Artist crafting character universes, brand identities, and motion storyboards.",
      url: "https://nesreen-mohammed.art",
      image: "https://nesreen-mohammed.art/slides/nesreen-portrait.webp",
      email: "Nesreen.1d@gmail.com",
      telephone: "+201015344062",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "Egypt",
      },
      knowsAbout: [
        "Illustration",
        "Character Design",
        "Storyboarding",
        "Visual Identity",
        "Motion Graphics",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://nesreen-mohammed.art/#website",
      url: "https://nesreen-mohammed.art",
      name: "Nesreen Mohammed Portfolio",
      description:
        "Official 2025-2026 Creative Portfolio of Nesreen Mohammed featuring 20 commercial projects and 50 presentation slides.",
      publisher: {
        "@id": "https://nesreen-mohammed.art/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cairo.variable} ${marhey.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet="/slides/responsive/nesreen-portrait-390.avif 390w, /slides/responsive/nesreen-portrait-640.avif 640w, /slides/responsive/nesreen-portrait-780.avif 780w"
          imageSizes="(max-width: 487px) 80vw, 390px"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body><StyledJsxRegistry>{children}</StyledJsxRegistry></body>
    </html>
  );
}
