import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Trust } from './components/sections/Trust'
import { Problem } from './components/sections/Problem'
import { Solution } from './components/sections/Solution'
import { BeforeAfterShowcase } from './components/sections/BeforeAfterShowcase'
import { Features } from './components/sections/Features'
import { FutureVision } from './components/sections/FutureVision'
import { SocialProof } from './components/sections/SocialProof'
import { UserResearchForm } from './components/sections/UserResearchForm'
import { Waitlist } from './components/sections/Waitlist'
import { FAQ } from './components/sections/FAQ'

function App() {
  return (
    <>
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
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
