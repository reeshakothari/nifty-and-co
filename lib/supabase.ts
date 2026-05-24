import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Fallback values let the build succeed during static prerender;
  // real requests only happen in the browser where env vars are embedded.
  _client = createClient(
    url  ?? 'https://placeholder.supabase.co',
    anon ?? 'placeholder-anon-key',
  );
  return _client;
}

// Proxy so call-sites can keep `supabase.from(...)` syntax unchanged
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getClient() as never)[prop];
  },
});

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string;
  goal: string | null;
  amount: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'converted' | 'lost';
};

export type ContentRow = {
  id: string;
  section: string;
  key: string;
  value: string;
  updated_at: string;
};
