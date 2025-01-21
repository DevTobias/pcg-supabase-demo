import { createClient } from '$/lib/supabase/client';

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const payload = await supabase.auth.signInWithPassword({ email, password }).catch(() => undefined);
  if (!payload) throw 'Failed to sign in';
  if (payload.error) throw payload.error.message;
  return payload;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const payload = await supabase.auth.signUp({ email, password }).catch(() => undefined);
  if (!payload) throw 'Failed to create account';
  if (payload.error) throw payload.error.message;
  return payload;
};

export const signInWithProvider = async (provider: 'google') => {
  const supabase = createClient();
  const payload = await supabase.auth
    .signInWithOAuth({ options: { redirectTo: 'http://localhost:3000/api/auth/callback' }, provider })
    .catch(() => undefined);
  if (!payload) throw 'Failed to authenticate with provider';
  if (payload.error) throw payload.error.message;
  return payload;
};

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};
