import { createClient } from '$/lib/supabase/client';

export const fetchUser = async (payload: { userId: string }) => {
  const supabase = createClient();
  const { data } = await supabase.from('users').select(`*`).eq('id', payload.userId);
  return data?.[0];
};
