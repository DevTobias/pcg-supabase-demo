import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useEffect, useRef } from 'react';

import type { Tables } from '$/lib/supabase/@generated/database.types';

import { Scrollable } from '$/components/common/Scrollable';
import { Button } from '$/components/ui/button';
import { Input } from '$/components/ui/input';
import { useAuthenticationStore } from '$/lib/supabase/authentication/useAuthenticationStore';
import { createClient } from '$/lib/supabase/client';
import { cn } from '$/lib/utils';
import { addMessage, messagesQuery } from '$/services/supabase/messages';
import { fetchUser } from '$/services/supabase/user';
import { useChannelStore } from '$/views/ChannelPage/store/useChannelStore';

export const Messages = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAuthenticationStore((s) => s.user);
  const activeChannelId = useChannelStore.use.activeChannelId();

  const channelMessagesQuery = messagesQuery(activeChannelId);
  const messages = useQuery(channelMessagesQuery);
  const addMessageMutation = useMutation({
    mutationFn: addMessage,
    onSettled: () => queryClient.invalidateQueries({ queryKey: channelMessagesQuery.queryKey }),
  });

  const submitMessage = async () => {
    const message = inputRef.current?.value;
    if (!inputRef.current || !user || !message || message === '') return;

    addMessageMutation.mutate({ channelId: activeChannelId, message, userId: user.id });

    inputRef.current.value = '';
  };

  useEffect(() => {
    const supabase = createClient();

    const messageListener = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (newMessage) => {
        const messagePayload = newMessage.new as Tables<'messages'>;

        if (messagePayload.channel_id !== activeChannelId) return;

        const author = await fetchUser({ userId: newMessage.new.user_id });
        if (!author) return;

        queryClient.setQueryData(channelMessagesQuery.queryKey, (oldData) => {
          if (!oldData || oldData?.some((i) => i.id === messagePayload.id)) return;
          const msg = { ...messagePayload, author };
          return [...oldData, msg];
        });
      })

      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, [channelMessagesQuery.queryKey, queryClient, activeChannelId]);

  return (
    <div className='grid h-full max-h-screen grid-rows-[1fr_auto] gap-10 p-4'>
      <Scrollable
        className='max-h-screen'
        overflow={{ x: 'hidden', y: 'scroll' }}
        scrollDependencies={[messages]}
        scrollToEnd
      >
        <div className='flex flex-col gap-[24px] px-20'>
          {messages.data &&
            messages.data.map((message) => {
              const isOwnMessage = message.author.id === user?.id;

              return (
                <div className={cn('flex flex-col gap-2', isOwnMessage && 'place-self-end')} key={message.id}>
                  <div className='text-lg leading-none font-bold'>{message.author.username}</div>
                  <div className='leading-none'>{message.message}</div>
                </div>
              );
            })}
        </div>
      </Scrollable>

      <div className='flex w-full gap-2'>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitMessage();
          }}
          ref={inputRef}
        />
        <Button onClick={submitMessage} size='icon' variant='outline'>
          <Send />
        </Button>
      </div>
    </div>
  );
};
