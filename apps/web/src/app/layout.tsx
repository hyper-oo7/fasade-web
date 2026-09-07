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
  alternates: {
    canonical: "/",
  },
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasade — Know if Your Skincare Is Actually Working",
    description: "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
    images: ["https://www.fasade.online/og-image.png"],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Fasade",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "description": "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
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
