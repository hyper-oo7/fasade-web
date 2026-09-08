import { Metadata } from 'next'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Trust } from '../components/sections/Trust'
import { Problem } from '../components/sections/Problem'
import { Solution } from '../components/sections/Solution'
import { BeforeAfterShowcase } from '../components/sections/BeforeAfterShowcase'
import { Features } from '../components/sections/Features'
import { FutureVision } from '../components/sections/FutureVision'
import { SocialProof } from '../components/sections/SocialProof'
import { UserResearchForm } from '../components/sections/UserResearchForm'
import { BlogTeaser } from '../components/sections/BlogTeaser'
import { Waitlist } from '../components/sections/Waitlist'
import { FAQ } from '../components/sections/FAQ'

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  }
}

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.fasade.online/#website",
      "url": "https://www.fasade.online/",
      "name": "Fasade",
      "description": "Track visible skin improvements, monitor product effectiveness, and stop guessing whether your routine is delivering results.",
      "publisher": {
        "@id": "https://www.fasade.online/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.fasade.online/#organization",
      "name": "Fasade",
      "url": "https://www.fasade.online/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fasade.online/favicon.svg"
      },
      "sameAs": [
        "https://twitter.com/FasadeApp",
        "https://instagram.com/fasade.app",
        "https://tiktok.com/@fasade.app"
      ]
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-plum focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Trust />
        <Problem />
        <Solution />
        <BeforeAfterShowcase />
        <Features />
        <FutureVision />
        <SocialProof />
        <UserResearchForm />
        <BlogTeaser />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
