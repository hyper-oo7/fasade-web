import { useState, type FormEvent } from 'react'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'
import { SectionWrapper } from '../layout/SectionWrapper'
import { FadeIn } from '../ui/FadeIn'
import { Button } from '../ui/Button'
import { submitWaitlistEmail } from '../../lib/api'

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Email is required')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address')
      return
    }

    setSubmitting(true)
    setError('')

    const result = await submitWaitlistEmail(trimmed, 'waitlist-section')

    setSubmitting(false)

    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
    setEmail('')
  }

  return (
    <SectionWrapper id="waitlist" background="blush">
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/30 to-lavender/30">
            <Mail size={24} className="text-rose-deep" />
          </div>

          <h2 className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
            Join the Fasade waitlist
          </h2>
          <p className="mt-3 text-base text-charcoal/65">
            Be the first to experience AI-powered beauty tracking. Early members get priority
            access and exclusive features.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-6 py-4 text-emerald-700">
              <CheckCircle2 size={20} />
              <span className="text-sm font-medium">You're on the list! We'll be in touch soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter your email"
                  className={`w-full rounded-full border bg-white px-6 py-4 text-charcoal placeholder:text-charcoal/40 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20 ${error ? 'border-red-400' : 'border-blush'}`}
                  autoComplete="email"
                  required
                  disabled={submitting}
                />
                {error && <p className="mt-1 text-left text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" size="lg" className="sm:shrink-0" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-charcoal/45">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </FadeIn>
    </SectionWrapper>
  )
}
