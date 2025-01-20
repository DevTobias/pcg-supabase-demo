'use client';

import type { FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  children: ReactNode;
}

export const ReactQueryClientProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 0, staleTime: 1000 * 60 * 10 } } }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
