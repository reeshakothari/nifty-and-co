import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

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
