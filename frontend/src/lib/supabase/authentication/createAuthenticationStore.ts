import type { User } from '@supabase/supabase-js';

import { createStore } from 'zustand/vanilla';

export type AuthenticationActions = object;

export type AuthenticationState = {
  user: null | User;
};

export type AuthenticationStore = AuthenticationActions & AuthenticationState;

export const defaultInitState: AuthenticationState = {
  user: null,
};

export const createAuthenticationStore = (initState: AuthenticationState = defaultInitState) => {
  return createStore<AuthenticationStore>()(() => ({
    ...initState,
  }));
};
