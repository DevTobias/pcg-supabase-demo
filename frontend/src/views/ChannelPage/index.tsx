'use client';

import type { FC } from 'react';

import { ChannelSidebar } from '$/views/ChannelPage/components/ChannelSidebar';
import { Messages } from '$/views/ChannelPage/components/Messages';

interface Props {
  id: string;
}

export const ChannelPage: FC<Props> = () => {
  return (
    <div className='grid h-screen grid-cols-[auto_1fr] items-center justify-center'>
      <ChannelSidebar />
      <Messages />
    </div>
  );
};
