import { useState, type FormEvent } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from './Button'
import { submitWaitlistEmail } from '../../lib/api'
import type { WaitlistEntry } from '../../types/form'

interface WaitlistFormProps {
  source: WaitlistEntry['source']
  inputId: string
  variant?: 'hero' | 'section'
}

export function WaitlistForm({ source, inputId, variant = 'section' }: WaitlistFormProps) {
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

    const result = await submitWaitlistEmail(trimmed, source)
    setSubmitting(false)

    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-4 text-emerald-700 ${
          variant === 'hero' ? 'justify-center lg:justify-start' : 'justify-center'
        }`}
      >
        <CheckCircle2 size={20} />
        <span className="text-sm font-medium">You're on the list! We'll be in touch soon.</span>
      </div>
    )
  }

  const isHero = variant === 'hero'

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 ${isHero ? 'sm:flex-row lg:justify-start' : 'sm:flex-row'}`}
    >
      <div className="flex-1">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          placeholder="Enter your email"
          className={`w-full border bg-white text-charcoal placeholder:text-charcoal/40 focus:border-rose-deep focus:outline-none focus:ring-2 focus:ring-rose-deep/20 disabled:opacity-60 ${
            isHero
              ? 'rounded-full px-5 py-3.5 text-sm sm:min-w-[260px]'
              : 'rounded-full px-6 py-4'
          } ${error ? 'border-red-400' : 'border-blush'}`}
          autoComplete="email"
          required
          disabled={submitting}
        />
        {error && (
          <p className={`mt-1 text-sm text-red-500 ${isHero ? 'text-left' : 'text-left'}`}>
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        size={isHero ? 'md' : 'lg'}
        className={isHero ? 'sm:shrink-0' : 'sm:shrink-0'}
        disabled={submitting}
      >
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
  )
}
