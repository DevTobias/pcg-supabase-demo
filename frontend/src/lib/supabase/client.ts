import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '$/lib/supabase/@generated/database.types';

import { env } from '$/config';

export function createClient() {
  return createBrowserClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
