import { Users, Heart } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { FadeIn } from '../ui/FadeIn'
import { Button } from '../ui/Button'
import { useScrollToSection } from '../../hooks/useScrollToSection'

export function SocialProof() {
  const scrollTo = useScrollToSection()

  return (
    <SectionWrapper background="gradient">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum via-plum/95 to-rose-deep p-8 text-center text-white sm:p-12 md:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold blur-3xl" />
          </div>

          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <Users size={28} />
            </div>

            <h2 className="font-display text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
              Be among the first women helping shape the future of objective skincare tracking.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Join our early community and influence the features we build. Your feedback
              directly shapes the product.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="!bg-white !text-plum !shadow-none hover:!bg-white/90"
                onClick={() => scrollTo('research')}
              >
                <Heart size={18} />
                Share Your Input
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                onClick={() => scrollTo('waitlist')}
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}
