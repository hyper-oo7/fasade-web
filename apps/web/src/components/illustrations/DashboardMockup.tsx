import { motion } from 'framer-motion'
import {
  TrendingUp,
  Droplets,
  Sun,
  Sparkles,
  CircleDot,
} from 'lucide-react'

const metrics = [
  { label: 'Beauty Score', value: '87', change: '+12', icon: Sparkles, color: 'text-rose-deep' },
  { label: 'Hydration', value: '92%', change: '+8%', icon: Droplets, color: 'text-blue-400' },
  { label: 'Skin Clarity', value: '84', change: '+15', icon: Sun, color: 'text-gold' },
  { label: 'Texture', value: '79', change: '+6', icon: CircleDot, color: 'text-plum' },
]

const chartBars = [45, 52, 48, 58, 62, 68, 72, 78, 82, 87]

export function DashboardMockup() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose/30 via-lavender/20 to-gold/20 blur-2xl" />

      <div className="glass relative overflow-hidden rounded-3xl shadow-2xl shadow-plum/10">
        <div className="border-b border-white/60 bg-gradient-to-r from-blush-light to-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-charcoal/50">
                Your Dashboard
              </p>
              <p className="font-display text-lg font-semibold text-plum">Beauty Progress</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              <TrendingUp size={12} />
              +12 this month
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="rounded-2xl bg-white/80 p-3.5 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <metric.icon size={14} className={metric.color} />
                  <span className="text-xs text-charcoal/50">{metric.label}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-semibold text-charcoal">{metric.value}</span>
                  <span className="text-xs font-medium text-emerald-500">{metric.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-charcoal/50">30-Day Trend</p>
              <p className="text-xs font-semibold text-rose-deep">Beauty Score</p>
            </div>
            <div className="flex items-end gap-1.5" style={{ height: 80 }}>
              {chartBars.map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-rose-deep/60 to-rose/80"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-plum/5 to-rose/10 p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-deep/10">
              <Sparkles size={18} className="text-rose-deep" />
            </div>
            <div>
              <p className="text-xs font-medium text-plum">AI Insight</p>
              <p className="text-xs leading-relaxed text-charcoal/60">
                Hydration improved 8% since adding vitamin C serum
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
