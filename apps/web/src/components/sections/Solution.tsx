import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { solutionSteps } from '../../data/content'

export function Solution() {
  return (
    <SectionWrapper id="solution" background="gradient">
      <SectionHeader
        eyebrow="How It Works"
        title="Four steps to visible progress"
        subtitle="Fasade turns your daily selfie into actionable beauty intelligence."
      />

      <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {solutionSteps.map((step) => (
          <StaggerItem key={step.step}>
            <div className="relative h-full">
              <div className="glass h-full rounded-2xl p-6 transition-shadow hover:shadow-lg hover:shadow-plum/5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-deep to-plum text-sm font-bold text-white">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{step.description}</p>
              </div>
              {step.step < 4 && (
                <div
                  className="absolute -right-4 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-rose/40 to-transparent lg:block"
                  aria-hidden="true"
                />
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}
