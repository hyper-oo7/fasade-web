import { Shuffle, Clock, Brain } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { problemPoints } from '../../data/content'

const icons = [Shuffle, Clock, Brain]

export function Problem() {
  return (
    <SectionWrapper background="blush">
      <SectionHeader
        eyebrow="The Problem"
        title="Most skincare progress goes unnoticed."
        subtitle="You put in the effort every day. But without a way to measure change, even real improvements disappear into the background."
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-3">
        {problemPoints.map((point, i) => {
          const Icon = icons[i]
          return (
            <StaggerItem key={point.title}>
              <div className="group h-full rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose/5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose/15 to-plum/10 transition-colors group-hover:from-rose/25 group-hover:to-plum/15">
                  <Icon size={22} className="text-rose-deep" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{point.description}</p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      <FadeIn className="mt-12 text-center">
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-charcoal/55">
          You deserve proof — not hope — that your routine is working.
        </p>
      </FadeIn>
    </SectionWrapper>
  )
}
