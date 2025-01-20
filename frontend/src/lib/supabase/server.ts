import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import type { Database } from '$/lib/supabase/@generated/database.types';

import { env } from '$/config';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, options, value }) => cookieStore.set(name, value, options));
      },
    },
  });
}
