import { create } from 'zustand';

import { createSelectors } from '$/lib/zustand';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ChannelActions {}

interface ChannelState {
  activeChannelId: number;
}

const initialChannelState: ChannelState = {
  activeChannelId: 1,
};

export const useChannelStore = createSelectors(
  create<ChannelActions & ChannelState>()(() => ({
    ...initialChannelState,
  })),
);
