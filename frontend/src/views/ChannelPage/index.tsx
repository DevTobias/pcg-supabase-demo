'use client';

import type { FC } from 'react';

import { useAuthenticationStore } from '$/lib/supabase/authentication/useAuthenticationStore';
import { ChannelSidebar } from '$/views/ChannelPage/components/ChannelSidebar';
import { Messages } from '$/views/ChannelPage/components/Messages';

interface Props {
  id: string;
}

export const ChannelPage: FC<Props> = ({ id }) => {
  const user = useAuthenticationStore((s) => s.user);

  return (
    <div className='grid h-screen grid-cols-[auto_1fr] items-center justify-center'>
      <ChannelSidebar />
      <Messages />
    </div>
  );
};
