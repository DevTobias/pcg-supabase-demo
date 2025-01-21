import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '$/components/ui/button';
import { cn, repeat } from '$/lib/utils';
import { signOut } from '$/services/supabase/authentication';
import { channelsQuery } from '$/services/supabase/channels';
import { useChannelStore } from '$/views/ChannelPage/store/useChannelStore';

export const ChannelSidebar = () => {
  const router = useRouter();
  const activeChannelId = useChannelStore.use.activeChannelId();
  const channels = useQuery(channelsQuery);

  return (
    <div className='border-border flex h-full w-[300px] flex-col justify-between border-r p-4'>
      <div>
        <div className='mb-3 text-3xl font-bold'>Channels</div>

        <div className='flex flex-col gap-2'>
          {channels.isLoading &&
            repeat(5).map((i) => <div className='bg-secondary/35 h-10 animate-pulse rounded-lg' key={i} />)}

          {channels.data &&
            channels.data.map((channel) => (
              <button
                className={cn(
                  'hover:bg-secondary flex w-full cursor-pointer items-center gap-3 rounded-lg p-2',
                  activeChannelId == channel.id && 'bg-secondary',
                )}
                key={channel.id}
                onClick={() => useChannelStore.setState({ activeChannelId: channel.id })}
              >
                <span className='text-2xl text-orange-400'>#</span>
                <span className='text-lg leading-none'>{channel.slug}</span>
              </button>
            ))}
        </div>
      </div>

      <Button
        onClick={async () => {
          await signOut();
          router.push('/login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};
