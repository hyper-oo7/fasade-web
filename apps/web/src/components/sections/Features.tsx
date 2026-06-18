import {
  Camera,
  Sparkles,
  ListChecks,
  Star,
  Brain,
  FlaskConical,
  BarChart3,
  Link2,
} from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { features } from '../../data/content'

const iconMap = {
  camera: Camera,
  sparkles: Sparkles,
  list: ListChecks,
  star: Star,
  brain: Brain,
  flask: FlaskConical,
  chart: BarChart3,
  link: Link2,
} as const

export function Features() {
  return (
    <SectionWrapper id="features" background="white">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need to measure beauty progress"
        subtitle="Built for women who want personalized insights — not generic beauty advice."
      />

      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon]
          return (
            <StaggerItem key={feature.title}>
              <div className="group h-full rounded-2xl border border-blush/80 bg-gradient-to-br from-white to-blush-light/30 p-5 transition-all hover:-translate-y-1 hover:border-rose/30 hover:shadow-lg hover:shadow-rose/5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-lavender/20 transition-transform group-hover:scale-110">
                  <Icon size={18} className="text-rose-deep" />
                </div>
                <h3 className="font-medium text-charcoal">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </SectionWrapper>
  )
}
