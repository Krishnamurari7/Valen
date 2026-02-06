export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      proposals: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          message: string | null
          partner_name: string
          response: string | null
          slug: string
          theme: string
          updated_at: string | null
          your_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          partner_name: string
          response?: string | null
          slug: string
          theme?: string
          updated_at?: string | null
          your_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          partner_name?: string
          response?: string | null
          slug?: string
          theme?: string
          updated_at?: string | null
          your_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type Proposal = Tables<'proposals'>
export type ProposalInsert = TablesInsert<'proposals'>
export type ProposalUpdate = TablesUpdate<'proposals'>

export type Theme = 'romantic' | 'cute' | 'funny'
export type Response = 'yes' | 'no' | null
