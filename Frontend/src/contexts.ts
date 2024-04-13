import { User } from 'firebase/auth';
import { createContext } from 'react';
import { AuthUser } from './types/interfaces';

export const AuthUserContext = createContext<
  [
    AuthUser | null | undefined,
    any,
    (user: User | null, forceRefresh?: boolean) => Promise<AuthUser | null>
  ]
>([undefined, null, async () => null]);
export const AlertContext = createContext<any>(null);
