import { isSupabaseConfigured, supabase, SUPABASE_TABLES } from './supabase'
import type { SurveyResponse, WaitlistEntry } from '../types/form'

const SURVEY_KEY = 'fasade_survey_responses'
const WAITLIST_KEY = 'fasade_waitlist'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export type SubmitResult = {
  success: boolean
  error?: string
  storedLocally?: boolean
}

export async function submitSurveyResponse(
  data: Omit<SurveyResponse, 'id' | 'createdAt'>,
): Promise<SubmitResult> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(SUPABASE_TABLES.surveyResponses).insert({
      name: data.name,
      email: data.email,
      age_group: data.ageGroup,
      beauty_concern: data.beautyConcern,
      selfie_frequency: data.selfieFrequency,
      tracks_skincare: data.tracksSkincare,
      would_upload_daily: data.wouldUploadDaily,
      would_pay_monthly: data.wouldPayMonthly,
      comments: data.comments,
    })

    if (!error) return { success: true }

    console.error('Supabase survey insert failed:', error.message)
  }

  saveSurveyResponseLocally(data)
  return {
    success: true,
    storedLocally: !isSupabaseConfigured,
    error: isSupabaseConfigured ? 'Saved locally after server error' : undefined,
  }
}

export async function submitWaitlistEmail(
  email: string,
  source: WaitlistEntry['source'],
): Promise<SubmitResult> {
  const normalized = email.trim().toLowerCase()

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(SUPABASE_TABLES.waitlist).insert({
      email: normalized,
      source,
    })

    if (!error) return { success: true }

    if (error.code === '23505') {
      return { success: true }
    }

    console.error('Supabase waitlist insert failed:', error.message)
  }

  saveWaitlistEmailLocally(normalized, source)
  return {
    success: true,
    storedLocally: !isSupabaseConfigured,
  }
}

function saveSurveyResponseLocally(
  data: Omit<SurveyResponse, 'id' | 'createdAt'>,
): SurveyResponse {
  const entry: SurveyResponse = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const existing = readJson<SurveyResponse[]>(SURVEY_KEY, [])
  writeJson(SURVEY_KEY, [...existing, entry])
  return entry
}

function saveWaitlistEmailLocally(
  email: string,
  source: WaitlistEntry['source'],
): WaitlistEntry {
  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
    source,
  }
  const existing = readJson<WaitlistEntry[]>(WAITLIST_KEY, [])
  const duplicate = existing.some((e) => e.email === entry.email)
  if (!duplicate) {
    writeJson(WAITLIST_KEY, [...existing, entry])
  }
  return entry
}

export function getSurveyResponses(): SurveyResponse[] {
  return readJson<SurveyResponse[]>(SURVEY_KEY, [])
}

export function getWaitlistEntries(): WaitlistEntry[] {
  return readJson<WaitlistEntry[]>(WAITLIST_KEY, [])
}

export function exportStoredData(): {
  surveys: SurveyResponse[]
  waitlist: WaitlistEntry[]
} {
  return {
    surveys: getSurveyResponses(),
    waitlist: getWaitlistEntries(),
  }
}
