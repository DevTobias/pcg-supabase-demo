'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import type { AuthenticationState, AuthenticationStore } from '$/lib/supabase/authentication/createAuthenticationStore';

import { createAuthenticationStore } from '$/lib/supabase/authentication/createAuthenticationStore';

export type AuthenticationStoreApi = ReturnType<typeof createAuthenticationStore>;

export const AuthenticationStoreContext = createContext<AuthenticationStoreApi | undefined>(undefined);

export interface AuthenticationStoreProviderProps {
  children: ReactNode;
  initial: AuthenticationState;
}

export const AuthenticationStoreProvider = ({ children, initial }: AuthenticationStoreProviderProps) => {
  const storeRef = useRef<AuthenticationStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createAuthenticationStore(initial);
  }

  return <AuthenticationStoreContext.Provider value={storeRef.current}>{children}</AuthenticationStoreContext.Provider>;
};

export const useAuthenticationStore = <T,>(selector: (store: AuthenticationStore) => T): T => {
  const authenticationStoreContext = useContext(AuthenticationStoreContext);

  if (!authenticationStoreContext) {
    throw new Error(`useAuthenticationStore must be used within AuthenticationStoreProvider`);
  }

  return useStore(authenticationStoreContext, selector);
};
