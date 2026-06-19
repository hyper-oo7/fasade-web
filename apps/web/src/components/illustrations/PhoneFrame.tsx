import { type ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
  className?: string
  label?: string
}

export function PhoneFrame({ children, className = '', label }: PhoneFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-[2rem] border-[3px] border-charcoal/10 bg-charcoal/5 shadow-2xl shadow-plum/15 ring-1 ring-white/80">
        <div className="flex items-center justify-center gap-1.5 border-b border-charcoal/5 bg-white/90 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-charcoal/10" />
          <div className="mx-auto h-1.5 w-16 rounded-full bg-charcoal/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-charcoal/10" />
        </div>
        <div className="bg-cream">{children}</div>
        <div className="flex justify-center bg-white/90 py-2">
          <div className="h-1 w-24 rounded-full bg-charcoal/15" />
        </div>
      </div>
      {label && (
        <p className="mt-3 text-center text-xs font-medium text-charcoal/45">{label}</p>
      )}
    </div>
  )
}

/** Abstract face silhouette — design mockup only, not a real photo */
export function AbstractFacePlaceholder({
  variant = 'before',
  className = '',
}: {
  variant?: 'before' | 'after'
  className?: string
}) {
  const isAfter = variant === 'after'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      aria-hidden="true"
    >
      <div
        className={`aspect-[3/4] w-full bg-gradient-to-b ${
          isAfter
            ? 'from-[#F5E8E0] via-[#EDD5CC] to-[#E8C4B8]'
            : 'from-[#EDE0D8] via-[#E2D0C8] to-[#D8C4BC]'
        }`}
      >
        {/* Face oval */}
        <div className="absolute inset-x-[18%] top-[12%] bottom-[28%] rounded-[50%] bg-gradient-to-b from-[#F0DDD4] to-[#E5CFC4] shadow-inner">
          {/* Forehead highlight */}
          <div className="absolute inset-x-[20%] top-[8%] h-[18%] rounded-full bg-white/25 blur-sm" />

          {/* Cheek warmth — reduced in "before" */}
          <div
            className={`absolute left-[12%] top-[42%] h-[22%] w-[28%] rounded-full blur-md ${
              isAfter ? 'bg-rose/20' : 'bg-rose/30'
            }`}
          />
          <div
            className={`absolute right-[12%] top-[42%] h-[22%] w-[28%] rounded-full blur-md ${
              isAfter ? 'bg-rose/20' : 'bg-rose/30'
            }`}
          />

          {/* Under-eye — more visible in before */}
          <div
            className={`absolute left-[22%] top-[38%] h-[6%] w-[18%] rounded-full blur-sm ${
              isAfter ? 'bg-plum/5' : 'bg-plum/15'
            }`}
          />
          <div
            className={`absolute right-[22%] top-[38%] h-[6%] w-[18%] rounded-full blur-sm ${
              isAfter ? 'bg-plum/5' : 'bg-plum/15'
            }`}
          />

          {/* Texture dots — more in before */}
          {!isAfter && (
            <>
              <div className="absolute left-[35%] top-[52%] h-1.5 w-1.5 rounded-full bg-plum/20" />
              <div className="absolute left-[48%] top-[48%] h-1 w-1 rounded-full bg-plum/15" />
              <div className="absolute right-[32%] top-[55%] h-1.5 w-1.5 rounded-full bg-plum/20" />
              <div className="absolute left-[42%] top-[58%] h-1 w-1 rounded-full bg-plum/15" />
            </>
          )}

          {/* Nose hint */}
          <div className="absolute left-1/2 top-[48%] h-[12%] w-[8%] -translate-x-1/2 rounded-full bg-charcoal/5" />

          {/* Lips */}
          <div className="absolute inset-x-[38%] bottom-[22%] h-[4%] rounded-full bg-rose-deep/25" />
        </div>

        {/* Scan overlay grid — app UI feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]" />

        {/* Corner brackets */}
        <div className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-rose-deep/40 rounded-tl-sm" />
        <div className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-rose-deep/40 rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-rose-deep/40 rounded-bl-sm" />
        <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-rose-deep/40 rounded-br-sm" />
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal/60 to-transparent px-3 pb-3 pt-8">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
          Design mockup
        </p>
        <p className="text-xs font-semibold text-white">
          {isAfter ? 'Week 8 · Improved clarity' : 'Week 1 · Baseline'}
        </p>
      </div>
    </div>
  )
}
