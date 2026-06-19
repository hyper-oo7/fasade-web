import { Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { FadeIn } from '../ui/FadeIn'
import { WaitlistForm } from '../ui/WaitlistForm'
import { HeroAppMockups } from '../illustrations/HeroAppMockups'
import { useScrollToSection } from '../../hooks/useScrollToSection'

export function Hero() {
  const scrollTo = useScrollToSection()

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pb-28 md:pt-36 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-lavender/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <FadeIn delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-plum">
              <Sparkles size={14} className="text-rose-deep" />
              <span>AI-Powered Skin Progress Tracking</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-charcoal sm:text-5xl md:text-6xl">
              Know if your skincare is{' '}
              <span className="text-gradient">actually working.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-charcoal/70 sm:text-lg lg:mx-0">
              Track visible skin improvements, monitor product effectiveness, and stop guessing
              whether your routine is delivering results.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8">
              <WaitlistForm source="hero" inputId="hero-waitlist-email" variant="hero" />
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button variant="ghost" size="sm" onClick={() => scrollTo('solution')}>
                See How It Works →
              </Button>
            </div>
            <p className="mt-4 text-sm text-charcoal/50">
              Free to join · Early access for waitlist members
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="left">
          <HeroAppMockups />
        </FadeIn>
      </div>
    </section>
  )
}
