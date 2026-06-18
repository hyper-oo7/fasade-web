import { useState, type FormEvent } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { SectionWrapper, SectionHeader } from '../layout/SectionWrapper'
import { FadeIn } from '../ui/FadeIn'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { submitSurveyResponse } from '../../lib/api'
import type {
  AgeGroup,
  BeautyConcern,
  SelfieFrequency,
  SurveyFormData,
  YesNoMaybe,
} from '../../types/form'

const initialForm: SurveyFormData = {
  name: '',
  email: '',
  ageGroup: '',
  beautyConcern: '',
  selfieFrequency: '',
  tracksSkincare: '',
  wouldUploadDaily: '',
  wouldPayMonthly: '',
  comments: '',
}

const ageGroups = ['18-21', '22-25', '26-29', '30-35', '35+'] as const
const beautyConcerns = [
  'Acne & breakouts',
  'Dark circles',
  'Pigmentation',
  'Dryness & hydration',
  'Fine lines & aging',
  'Hair health',
  'Overall skin texture',
  'Other',
] as const
const selfieFrequencies = ['Daily', 'A few times a week', 'Weekly', 'Rarely', 'Never'] as const
const yesNoMaybe = ['Yes', 'No', 'Maybe'] as const

export function UserResearchForm() {
  const [form, setForm] = useState<SurveyFormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof SurveyFormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field: keyof SurveyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof SurveyFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.ageGroup) next.ageGroup = 'Please select your age group'
    if (!form.beautyConcern) next.beautyConcern = 'Please select a concern'
    if (!form.selfieFrequency) next.selfieFrequency = 'Please select an option'
    if (!form.tracksSkincare) next.tracksSkincare = 'Please select an option'
    if (!form.wouldUploadDaily) next.wouldUploadDaily = 'Please select an option'
    if (!form.wouldPayMonthly) next.wouldPayMonthly = 'Please select an option'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    const result = await submitSurveyResponse({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      ageGroup: form.ageGroup as AgeGroup,
      beautyConcern: form.beautyConcern as BeautyConcern,
      selfieFrequency: form.selfieFrequency as SelfieFrequency,
      tracksSkincare: form.tracksSkincare as YesNoMaybe,
      wouldUploadDaily: form.wouldUploadDaily as YesNoMaybe,
      wouldPayMonthly: form.wouldPayMonthly as YesNoMaybe,
      comments: form.comments.trim(),
    })

    setSubmitting(false)

    if (!result.success) {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
    setForm(initialForm)
  }

  if (submitted) {
    return (
      <SectionWrapper id="research" background="white">
        <FadeIn>
          <div className="mx-auto max-w-lg rounded-3xl border border-emerald-200 bg-emerald-50/50 p-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
            <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal">
              Thank you for sharing!
            </h3>
            <p className="mt-2 text-sm text-charcoal/65">
              Your responses help us build Fasade for women like you. We'll be in touch soon.
            </p>
            <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
              Submit another response
            </Button>
          </div>
        </FadeIn>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="research" background="white">
      <SectionHeader
        eyebrow="Help Us Build"
        title="Tell us about your beauty journey"
        subtitle="Take 2 minutes to share your experience. Your input directly shapes what we build."
      />

      <FadeIn>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-6 rounded-3xl border border-blush bg-gradient-to-br from-white to-blush-light/20 p-6 shadow-sm sm:p-8"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              error={errors.name}
              placeholder="Your name"
              autoComplete="name"
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Select
              label="Age Group"
              options={ageGroups}
              value={form.ageGroup}
              onChange={(e) => update('ageGroup', e.target.value)}
              error={errors.ageGroup}
              required
            />
            <Select
              label="Biggest Beauty Concern"
              options={beautyConcerns}
              value={form.beautyConcern}
              onChange={(e) => update('beautyConcern', e.target.value)}
              error={errors.beautyConcern}
              required
            />
          </div>

          <Select
            label="How often do you take selfies?"
            options={selfieFrequencies}
            value={form.selfieFrequency}
            onChange={(e) => update('selfieFrequency', e.target.value)}
            error={errors.selfieFrequency}
            required
          />

          <Select
            label="Do you currently track skincare results?"
            options={yesNoMaybe}
            value={form.tracksSkincare}
            onChange={(e) => update('tracksSkincare', e.target.value)}
            error={errors.tracksSkincare}
            required
          />

          <Select
            label="Would you upload one selfie daily?"
            options={yesNoMaybe}
            value={form.wouldUploadDaily}
            onChange={(e) => update('wouldUploadDaily', e.target.value)}
            error={errors.wouldUploadDaily}
            required
          />

          <Select
            label="Would you pay ₹99/month if the product genuinely improved your appearance tracking?"
            options={yesNoMaybe}
            value={form.wouldPayMonthly}
            onChange={(e) => update('wouldPayMonthly', e.target.value)}
            error={errors.wouldPayMonthly}
            required
          />

          <Textarea
            label="Additional comments"
            value={form.comments}
            onChange={(e) => update('comments', e.target.value)}
            placeholder="Anything else you'd like us to know about your beauty routine or expectations..."
          />

          <Button type="submit" size="lg" fullWidth disabled={submitting}>
            <Send size={18} />
            {submitting ? 'Submitting...' : 'Submit Research Form'}
          </Button>

          {submitError && (
            <p className="text-center text-sm text-red-500">{submitError}</p>
          )}

          <p className="text-center text-xs text-charcoal/45">
            Your responses are stored securely. We never share your data.
          </p>
        </form>
      </FadeIn>
    </SectionWrapper>
  )
}
