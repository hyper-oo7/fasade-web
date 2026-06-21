import { Mail } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { FadeIn } from '../ui/FadeIn'
import { WaitlistForm } from '../ui/WaitlistForm'

export function Waitlist() {
  return (
    <SectionWrapper id="waitlist" background="blush">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/30 to-lavender/30">
            <Mail size={24} className="text-rose-deep" />
          </div>

          <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Join the Fasade waitlist
          </h2>
          <p className="mt-3 text-base text-charcoal/65">
            Be the first to know if your skincare is actually working. Early members get priority
            access and exclusive features.
          </p>
          
          <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-sm font-semibold text-emerald-700">
            Be among the first women helping shape Fasade
            </p>
          </div>
          <div className="mt-8">
            <WaitlistForm source="waitlist-section" inputId="waitlist-email" variant="section" />
          </div>

          <p className="mt-4 text-xs text-charcoal/45">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}
