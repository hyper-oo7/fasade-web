export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          source: 'hero' | 'waitlist-section' | 'footer'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          source?: 'hero' | 'waitlist-section' | 'footer'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          source?: 'hero' | 'waitlist-section' | 'footer'
          created_at?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          id: string
          name: string
          email: string
          age_group: string
          beauty_concern: string
          selfie_frequency: string
          tracks_skincare: string
          would_upload_daily: string
          would_pay_monthly: string
          comments: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          age_group: string
          beauty_concern: string
          selfie_frequency: string
          tracks_skincare: string
          would_upload_daily: string
          would_pay_monthly: string
          comments?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          age_group?: string
          beauty_concern?: string
          selfie_frequency?: string
          tracks_skincare?: string
          would_upload_daily?: string
          would_pay_monthly?: string
          comments?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
