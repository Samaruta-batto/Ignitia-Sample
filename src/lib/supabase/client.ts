import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Simple check to see if the variables are placeholders
const areCredentialsSet =
  supabaseUrl &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL') &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY')

export function createClient() {
  if (!areCredentialsSet) {
    // Return a mock client or null if credentials are not set
    return null
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}