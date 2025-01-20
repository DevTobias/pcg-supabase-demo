import { queryOptions } from '@tanstack/react-query';

import { createClient } from '$/lib/supabase/client';

export const fetchChannels = async (signal: AbortSignal) => {
  const supabase = createClient();
  const { data } = await supabase.from('channels').select('*').abortSignal(signal);
  return data;
};

export const channelsQuery = queryOptions({
  queryFn: ({ signal }) => fetchChannels(signal),
  queryKey: ['channels'],
});
