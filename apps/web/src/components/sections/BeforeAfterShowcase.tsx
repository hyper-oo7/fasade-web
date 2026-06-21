import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Droplets, Sun, CircleDot } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { FadeIn, StaggerContainer, StaggerItem } from '../ui/FadeIn'
import { PhoneFrame } from '../illustrations/PhoneFrame'

const beforeMetrics = [
  { label: 'Progress Score', value: '62', icon: TrendingUp },
  { label: 'Hydration', value: '71%', icon: Droplets },
  { label: 'Clarity', value: '58', icon: Sun },
  { label: 'Texture', value: '65', icon: CircleDot },
]

const afterMetrics = [
  { label: 'Progress Score', value: '84', icon: TrendingUp, change: '+22' },
  { label: 'Hydration', value: '89%', icon: Droplets, change: '+18%' },
  { label: 'Clarity', value: '79', icon: Sun, change: '+21' },
  { label: 'Texture', value: '78', icon: CircleDot, change: '+13' },
]

const timelineWeeks = [
  { week: 'Wk 1', score: 62 },
  { week: 'Wk 2', score: 64 },
  { week: 'Wk 3', score: 66 },
  { week: 'Wk 4', score: 69 },
  { week: 'Wk 5', score: 73 },
  { week: 'Wk 6', score: 76 },
  { week: 'Wk 7', score: 80 },
  { week: 'Wk 8', score: 84 },
]

function ComparisonCard({
  variant,
  metrics,
  title,
  subtitle,
}: {
  variant: 'before' | 'after'
  metrics: typeof beforeMetrics | typeof afterMetrics
  title: string
  subtitle: string
}) {
  const isAfter = variant === 'after'

  return (
    <div
      className={`overflow-hidden rounded-3xl border shadow-lg ${
        isAfter
          ? 'border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/30 shadow-emerald/5'
          : 'border-blush bg-gradient-to-br from-white to-blush-light/40 shadow-plum/5'
      }`}
    >
      <div className="border-b border-blush/50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/45">
          {title}
        </p>
        <p className="font-display text-lg font-semibold text-plum">{subtitle}</p>
      </div>

      <div className="p-5">

      <div className="relative mb-4 overflow-hidden rounded-2xl">
        <img
          src={variant === 'before' ? '/before-face.png' : '/after-face.png'}
          alt={variant === 'before' ? 'Before' : 'After'}
         className="block h-[280px] w-full object-cover"
        />

       <div
         className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
           variant === 'before'
             ? 'bg-red-500'
             : 'bg-emerald-500'
          }`}
     >
          {variant === 'before'
           ? 'BEFORE · Day 1'
           : 'AFTER · Week 8'}
       </div>
      </div>

        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-white/80 p-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <m.icon size={12} className="text-rose-deep" />
                <span className="text-[10px] text-charcoal/45">{m.label}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-charcoal">{m.value}</span>
                {'change' in m && (
                  <span className="text-[10px] font-semibold text-emerald-500">{m.change}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineMockup() {
  return (
    <PhoneFrame className="mx-auto max-w-[280px]">
      <div className="p-4">
        <p className="mb-1 text-[9px] font-medium uppercase tracking-wider text-charcoal/45">
          8-week timeline
        </p>
        <p className="mb-4 font-display text-sm font-semibold text-plum">Gradual, visible progress</p>

        <div className="relative mb-4 h-24">
          <svg viewBox="0 0 240 80" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C4848A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C4848A" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 70 L 30 65 L 60 62 L 90 55 L 120 48 L 150 38 L 180 28 L 210 18 L 240 10"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <div className="flex justify-between gap-1">
          {timelineWeeks.map((w, i) => (
            <motion.div
              key={w.week}
              className="flex flex-1 flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className={`mb-1 h-8 w-full rounded-sm ${
                  i === timelineWeeks.length - 1
                    ? 'bg-gradient-to-t from-rose-deep to-rose/70'
                    : 'bg-gradient-to-t from-rose-deep/30 to-rose/40'
                }`}
                style={{ height: `${(w.score - 50) * 1.2}px` }}
              />
              <span className="text-[7px] text-charcoal/40">{w.week}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
          <TrendingUp size={12} className="text-emerald-600" />
          <p className="text-[9px] font-medium text-emerald-700">
            +22 points over 8 weeks — too gradual to notice without tracking
          </p>
        </div>
      </div>
    </PhoneFrame>
  )
}

export function BeforeAfterShowcase() {
  return (
    <SectionWrapper id="progress" background="gradient">
      <SectionHeader
        eyebrow="See the Difference"
        title="Progress you'd never notice on your own"
        subtitle="Track subtle changes in skin health over time with objective visual comparisons and progress insights."
      />

      <div className="mb-10 flex items-center justify-center gap-3">
        <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-plum">
          AI-generated example
        </span>
        <span className="text-xs text-charcoal/45">Illustrative example</span>
      </div>

      <StaggerContainer className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <StaggerItem>
          <ComparisonCard
            variant="before"
            metrics={beforeMetrics}
            title="Baseline"
            subtitle="Week 1 · Starting routine"
          />
        </StaggerItem>
        <StaggerItem>
          <ComparisonCard
            variant="after"
            metrics={afterMetrics}
            title="After 8 weeks"
            subtitle="Visible improvement tracked"
          />
        </StaggerItem>
      </StaggerContainer>

      <FadeIn className="mt-8 flex justify-center">
        <div className="flex items-center gap-3 rounded-2xl glass px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/15">
            <ArrowRight size={18} className="text-rose-deep" />
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">Hydration +18% · Clarity +21 · Texture +13</p>
            <p className="text-xs text-charcoal/55">
              Changes too subtle to see in the mirror — clear in your data
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn className="mt-12">
        <TimelineMockup />
      </FadeIn>

      <FadeIn className="mt-10 text-center">
        <p className="mx-auto max-w-xl text-sm italic text-charcoal/50">
        These examples demonstrate how Fasade could visualize gradual skin changes over time.
        </p>
      </FadeIn>
    </SectionWrapper>
  )
}
