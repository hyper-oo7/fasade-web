import { motion } from 'framer-motion'
import {
  TrendingUp,
  Droplets,
  Sun,
  Sparkles,
  CircleDot,
  Camera,
  ChevronRight,
  FlaskConical,
} from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'

const metrics = [
  { label: 'Progress Score', value: '87', change: '+12', icon: Sparkles },
  { label: 'Hydration', value: '92%', change: '+8%', icon: Droplets },
  { label: 'Clarity', value: '84', change: '+15', icon: Sun },
  { label: 'Texture', value: '79', change: '+6', icon: CircleDot },
]

const chartBars = [45, 52, 48, 58, 62, 68, 72, 78, 82, 87]

function DashboardScreen() {
  return (
    <div className="space-y-3 p-3.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-wider text-charcoal/45">
            Today
          </p>
          <p className="font-display text-sm font-semibold text-plum">Progress</p>
        </div>
        <div className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
          <TrendingUp size={9} />
          +12
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="rounded-xl bg-white p-2.5 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          >
            <div className="flex items-center gap-1">
              <m.icon size={10} className="text-rose-deep" />
              <span className="text-[8px] text-charcoal/45">{m.label}</span>
            </div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-sm font-bold text-charcoal">{m.value}</span>
              <span className="text-[8px] font-medium text-emerald-500">{m.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-2.5 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[8px] text-charcoal/45">30-day trend</span>
          <span className="text-[8px] font-semibold text-rose-deep">Score</span>
        </div>
        <div className="flex h-12 items-end gap-1">
          {chartBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-rose-deep/50 to-rose/70"
              initial={{ height: 0 }}
              animate={{ height: `${h * 0.55}%` }}
              transition={{ delay: 0.7 + i * 0.04, duration: 0.4 }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-plum/5 to-rose/10 p-2.5">
        <Sparkles size={12} className="shrink-0 text-rose-deep" />
        <p className="text-[8px] leading-snug text-charcoal/55">
          Vitamin C serum correlates with +8% hydration
        </p>
      </div>
    </div>
  )
}

function SelfieCaptureScreen() {
  return (
    <div className="p-3.5">
      <p className="mb-2 text-center font-display text-xs font-semibold text-plum">
        Daily Check-in
      </p>
      <div className="relative mx-auto aspect-[3/4] w-[85%] overflow-hidden rounded-2xl bg-gradient-to-b from-[#EDE0D8] to-[#D8C4BC]">
        <div className="absolute inset-x-[22%] top-[15%] bottom-[30%] rounded-[50%] bg-gradient-to-b from-[#F0DDD4] to-[#E5CFC4]" />
        <div className="absolute left-2 top-2 h-4 w-4 border-l border-t border-rose-deep/50" />
        <div className="absolute right-2 top-2 h-4 w-4 border-r border-t border-rose-deep/50" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-rose-deep/50" />
        <div className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-rose-deep/50" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/50 to-transparent p-3 pt-6">
          <p className="text-center text-[8px] text-white/80">Align face in frame</p>
        </div>
      </div>
      <div className="mx-auto mt-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-deep bg-white shadow-md">
        <Camera size={16} className="text-rose-deep" />
      </div>
    </div>
  )
}

function ProductInsightScreen() {
  const products = [
    { name: 'Vitamin C Serum', effect: '+8% hydration', working: true },
    { name: 'Retinol Night Cream', effect: '+6% texture', working: true },
    { name: 'New Moisturizer', effect: 'No change yet', working: false },
  ]

  return (
    <div className="space-y-2.5 p-3.5">
      <p className="font-display text-xs font-semibold text-plum">Product Insights</p>
      <p className="text-[8px] text-charcoal/45">What's actually working</p>
      {products.map((p, i) => (
        <motion.div
          key={p.name}
          className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
              p.working ? 'bg-emerald-50' : 'bg-blush-light'
            }`}
          >
            <FlaskConical size={12} className={p.working ? 'text-emerald-600' : 'text-charcoal/35'} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[9px] font-medium text-charcoal">{p.name}</p>
            <p
              className={`text-[8px] ${p.working ? 'text-emerald-600' : 'text-charcoal/40'}`}
            >
              {p.effect}
            </p>
          </div>
          <ChevronRight size={10} className="shrink-0 text-charcoal/25" />
        </motion.div>
      ))}
    </div>
  )
}

export function HeroAppMockups() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[340px] sm:h-[460px] sm:max-w-[380px] lg:mx-0 lg:h-[420px] lg:max-w-none">
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-rose/25 via-lavender/15 to-gold/15 blur-2xl" />

      {/* Back-left: selfie capture — hidden on smallest screens */}
      <motion.div
        className="absolute -left-2 top-8 z-10 hidden w-[44%] sm:block sm:-left-4"
        initial={{ opacity: 0, x: -20, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <PhoneFrame label="Daily selfie">
          <SelfieCaptureScreen />
        </PhoneFrame>
      </motion.div>

      {/* Center: main dashboard */}
      <motion.div
        className="absolute left-1/2 top-0 z-30 w-[72%] -translate-x-1/2 sm:w-[56%]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <PhoneFrame>
          <DashboardScreen />
        </PhoneFrame>
      </motion.div>

      {/* Back-right: product insights — hidden on smallest screens */}
      <motion.div
        className="absolute -right-2 top-10 z-10 hidden w-[44%] sm:block sm:-right-4"
        initial={{ opacity: 0, x: 20, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <PhoneFrame label="Product insights">
          <ProductInsightScreen />
        </PhoneFrame>
      </motion.div>
    </div>
  )
}
