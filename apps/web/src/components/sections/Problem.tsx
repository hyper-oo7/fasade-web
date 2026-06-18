import { HelpCircle, Eye, MessageCircleOff } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { problemPoints } from '../../data/content'

const icons = [HelpCircle, Eye, MessageCircleOff]

export function Problem() {
  return (
    <SectionWrapper background="white">
      <SectionHeader
        eyebrow="The Problem"
        title="Beauty progress shouldn't be a mystery"
        subtitle="Millions of women invest time and money in skincare — but most never know if it's actually working."
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        {problemPoints.map((point, i) => {
          const Icon = icons[i]
          return (
            <StaggerItem key={point.title}>
              <div className="group h-full rounded-2xl border border-blush bg-cream/50 p-6 transition-all hover:border-rose/40 hover:shadow-lg hover:shadow-rose/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose/15 transition-colors group-hover:bg-rose/25">
                  <Icon size={22} className="text-rose-deep" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{point.description}</p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      <FadeIn className="mt-12 text-center">
        <p className="mx-auto max-w-2xl text-base italic text-charcoal/50">
          You deserve to know — with data, not guesswork — whether your routine is truly
          transforming your skin.
        </p>
      </FadeIn>
    </SectionWrapper>
  )
}
