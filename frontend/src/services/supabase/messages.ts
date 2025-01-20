import { queryOptions } from '@tanstack/react-query';

import { createClient } from '$/lib/supabase/client';

export const fetchMessages = async (signal: AbortSignal, payload: { channelId: number }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('messages')
    .select(`*, author:user_id(*)`)
    .eq('channel_id', payload.channelId)
    .order('inserted_at', { ascending: true });
  return data;
};

export const addMessage = async (payload: { channelId: number; message: string; userId: string }) => {
  const supabase = createClient();
  const { channelId: channel_id, message, userId: user_id } = payload;
  const { data } = await supabase.from('messages').insert([{ channel_id, message, user_id }]).select();
  return data;
};

export const messagesQuery = (channelId: number) =>
  queryOptions({
    queryFn: ({ signal }) => fetchMessages(signal, { channelId }),
    queryKey: ['messages', channelId],
  });
