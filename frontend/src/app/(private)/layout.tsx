import type { ReactNode } from 'react';

import { ssrUseAuthGuard } from '$/lib/supabase/authentication/ssrUseAuthGuard';
import { AuthenticationStoreProvider } from '$/lib/supabase/authentication/useAuthenticationStore';

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await ssrUseAuthGuard();
  return <AuthenticationStoreProvider initial={{ user }}>{children}</AuthenticationStoreProvider>;
}
