import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fasade.online"),
  title: "Fasade — Know if Your Skincare Is Actually Working",
  description: "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
  verification: {
    google: "googledf58d18be55c3409",
  },
  openGraph: {
    title: "Fasade — Know if Your Skincare Is Actually Working",
    description: "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
    url: "https://www.fasade.online/",
    siteName: "Fasade",
    images: [
      {
        url: "https://www.fasade.online/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@FasadeApp",
    creator: "@FasadeApp",
    title: "Fasade — Know if Your Skincare Is Actually Working",
    description: "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
    images: ["https://www.fasade.online/og-image.png"],
  },
  authors: [{ name: "Raman Kumar Jha", url: "https://www.fasade.online" }],
  creator: "Raman Kumar Jha",
  publisher: "Fasade",
  category: "Health & Beauty",
  keywords: [
    "skincare tracker", "skin progress app", "skincare routine tracker",
    "how long does skincare take to work", "skin progress monitoring",
    "retinol tracker", "niacinamide results", "skincare AI app",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Fasade",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web, iOS, Android",
      "description": "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
      "url": "https://www.fasade.online",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "124"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.fasade.online/#author",
      "name": "Raman Kumar Jha",
      "jobTitle": "Founder & Skincare Technology Researcher",
      "url": "https://www.fasade.online",
      "worksFor": {
        "@type": "Organization",
        "name": "Fasade",
        "url": "https://www.fasade.online"
      },
      "knowsAbout": [
        "Skincare Science",
        "AI Skin Analysis",
        "Dermatology",
        "Cosmetic Ingredients",
        "Skin Progress Tracking"
      ],
      "sameAs": [
        "https://twitter.com/FasadeApp",
        "https://instagram.com/fasade.app"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
