'use client';

import { useEffect, useState } from 'react';

import { openSans, ubuntu } from '@/config/fonts';
import './globals.css';

import Alert from '@/components/Alert';
import Header from '@/components/Navbar';
import { auth } from '@/config/firebase-config';
import { AlertContext, AuthUserContext } from '@/contexts';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/client/auth';
import { AlertMessage, AuthUser, LayoutProps } from '@/types/interfaces';
import { config as fontaAwesomeConfig } from '@fortawesome/fontawesome-svg-core';
import { User, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

fontaAwesomeConfig.autoAddCss = false;

export default function RootLayout({ children, params }: LayoutProps) {
  const dict = dictionaries[params.lang];

  const [authUser, setAuthUser] = useState<AuthUser | null | undefined>(
    undefined
  );
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const router = useRouter();
  const queryParams = useSearchParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      handleSetAuthUser(authUser);
      if (!authUser) {
        return;
      }
      const userClaims = (await authUser.getIdTokenResult()).claims;

      if (!userClaims.registered) {
        return;
      }
      const user = await AuthService.getConnectedUser();

      const accountType = user.accounts.find((account: any) =>
        ['branch', 'brand'].includes(account.type)
      )!.type;

      if (!Cookies.get('accountType')) {
        Cookies.set('accountType', accountType);
      }

      await AuthService.refreshToken(true);

      setAuthUser((authUser) => ({
        ...authUser,
        user,
      }));

      localStorage.setItem('account', user.accounts[0]._id);

      const redirect = queryParams.get('redirect');

      if (redirect) {
        router.push(redirect);
      }
    });

    const interval = setInterval(() => {
      (async () => {
        try {
          await AuthService.refreshToken(true);
        } catch (error) {
          console.error(error);
        }
      })();
    }, 1000 * 60 * 30);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleShowAlert = (alert: AlertMessage) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleSetAuthUser = async (user: User | null, forceRefresh = false) => {
    let authUser: AuthUser | null | undefined;

    if (!user) {
      authUser = null;
      setAuthUser(authUser);
    } else {
      if (forceRefresh) {
        await AuthService.refreshToken(true);
      }
      const tokenResult = await auth.currentUser?.getIdTokenResult();
      authUser = {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        claims: tokenResult?.claims,
      };
      setAuthUser((_authUser) => ({ ..._authUser, ...authUser }));
    }

    return authUser;
  };

  return (
    <html
      lang={params.lang}
      className={`${openSans.variable} ${ubuntu.variable} font-sans`}
    >
      <body>
        <AuthUserContext.Provider
          value={[authUser, setAuthUser, handleSetAuthUser]}
        >
          <AlertContext.Provider value={handleShowAlert}>
            <Header dict={dict} lang={params.lang} />
            <main
              className={twMerge(
                'mt-header-height w-screen',
                'h-[calc(100vh_-_theme(spacing.header-height))]'
              )}
            >
              {children}
            </main>
          </AlertContext.Provider>
        </AuthUserContext.Provider>

        {alert && <Alert alert={alert} />}
      </body>
    </html>
  );
}
