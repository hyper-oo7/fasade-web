import { type ReactNode } from 'react'

interface SectionWrapperProps {
  id?: string
  children: ReactNode
  className?: string
  background?: 'cream' | 'blush' | 'white' | 'gradient'
}

const bgStyles = {
  cream: 'bg-cream',
  blush: 'bg-blush-light',
  white: 'bg-white',
  gradient: 'bg-gradient-to-b from-cream via-blush-light to-cream',
}

export function SectionWrapper({
  id,
  children,
  className = '',
  background = 'cream',
}: SectionWrapperProps) {
  return (
    <section id={id} className={`section-padding ${bgStyles[background]} ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-deep">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
