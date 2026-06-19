import { Shield, Lock, Brain, BarChart3 } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { StaggerContainer, StaggerItem } from '../ui/FadeIn'

const trustCards = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your photos stay yours. Delete anytime, no questions asked.',
  },
  {
    icon: Lock,
    title: 'Secure Photo Storage',
    description: 'Encrypted storage with industry-standard security protocols.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Objective skin trend detection — not subjective ratings.',
  },
  {
    icon: BarChart3,
    title: 'Evidence-Based Tracking',
    description: 'See measurable progress backed by your own daily data.',
  },
] as const

export function Trust() {
  return (
    <SectionWrapper background="white" className="!py-10 md:!py-14">
      <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {trustCards.map((card) => (
          <StaggerItem key={card.title}>
            <div className="flex h-full flex-col items-center rounded-2xl border border-blush/60 bg-cream/40 px-4 py-5 text-center transition-shadow hover:shadow-md hover:shadow-rose/5 sm:px-5 sm:py-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose/15 to-lavender/15">
                <card.icon size={20} className="text-rose-deep" />
              </div>
              <h3 className="text-sm font-semibold text-charcoal sm:text-base">{card.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-charcoal/55 sm:text-sm">
                {card.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}
