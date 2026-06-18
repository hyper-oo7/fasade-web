export type AgeGroup = '18-21' | '22-25' | '26-29' | '30-35' | '35+'

export type BeautyConcern =
  | 'Acne & breakouts'
  | 'Dark circles'
  | 'Pigmentation'
  | 'Dryness & hydration'
  | 'Fine lines & aging'
  | 'Hair health'
  | 'Overall skin texture'
  | 'Other'

export type SelfieFrequency =
  | 'Daily'
  | 'A few times a week'
  | 'Weekly'
  | 'Rarely'
  | 'Never'

export type YesNoMaybe = 'Yes' | 'No' | 'Maybe'

export interface SurveyResponse {
  id: string
  createdAt: string
  name: string
  email: string
  ageGroup: AgeGroup
  beautyConcern: BeautyConcern
  selfieFrequency: SelfieFrequency
  tracksSkincare: YesNoMaybe
  wouldUploadDaily: YesNoMaybe
  wouldPayMonthly: YesNoMaybe
  comments: string
}

export interface SurveyFormData {
  name: string
  email: string
  ageGroup: AgeGroup | ''
  beautyConcern: BeautyConcern | ''
  selfieFrequency: SelfieFrequency | ''
  tracksSkincare: YesNoMaybe | ''
  wouldUploadDaily: YesNoMaybe | ''
  wouldPayMonthly: YesNoMaybe | ''
  comments: string
}

export interface WaitlistEntry {
  id: string
  email: string
  createdAt: string
  source: 'hero' | 'waitlist-section' | 'footer'
}
