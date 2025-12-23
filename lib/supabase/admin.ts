import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase admin client with service role key
 * Use this for server-side operations that bypass Row Level Security (RLS)
 * ⚠️ Never expose this key to the client/browser
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin credentials');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

