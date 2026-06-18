import { Rocket } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { futureFeatures } from '../../data/content'

export function FutureVision() {
  return (
    <SectionWrapper background="blush">
      <SectionHeader
        eyebrow="Coming Soon"
        title="The future of personalized beauty"
        subtitle="We're building the world's most personalized beauty improvement platform — and you're invited to shape it."
      />

      <StaggerContainer className="flex flex-wrap justify-center gap-3">
        {futureFeatures.map((feature) => (
          <StaggerItem key={feature}>
            <div className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-plum shadow-sm">
              <Rocket size={14} className="text-rose-deep" />
              {feature}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="mt-12">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-plum/5 via-rose/10 to-gold/10 p-8 text-center">
          <p className="font-display text-xl font-medium text-charcoal sm:text-2xl">
            Beauty scores. Progress dashboards. Routine optimization. AI coaching.
          </p>
          <p className="mt-3 text-sm text-charcoal/60">
            All personalized to your unique skin journey.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}
