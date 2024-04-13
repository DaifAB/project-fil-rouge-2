import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { config } from '@/config';
import {
  loginPages,
  unauthenticatedPages,
  unauthenticatedRoutes,
} from '@/config/auth';
import http from '@/utils/http/http';
import { i18n } from './i18n';

export async function middleware(request: NextRequest) {
  // skip static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname.startsWith('/manifest.json') ||
    request.nextUrl.pathname.startsWith('/robots.txt') ||
    request.nextUrl.pathname.startsWith('/assets')
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const locale =
    i18n.locales.find(
      (locale) =>
        request.nextUrl.pathname.startsWith(`/${locale}`) &&
        request.nextUrl.pathname.split('/')[1].length === 2
    ) || '';

  let pathname: string = request.nextUrl.pathname;

  if (pathname.startsWith('/api')) {
    if (!unauthenticatedRoutes.some((route) => pathname.startsWith(route))) {
      const authRes = await authMiddleware(request);
      if (!authRes) {
        return NextResponse.redirect(
          new URL('/sign-in?redirect=xxx', config.baseUrl)
        );
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  } else {
    pathname = pathname.replace(`/${locale}/`, '/');
    pathname = pathname.replace(`/${locale}`, '/');

    if (
      !unauthenticatedPages.some((page) =>
        page === '/' ? pathname === page : pathname.startsWith(page)
      )
    ) {
      const authRes = await authMiddleware(request);

      const isLoginPage = loginPages.some((page) => pathname === page);

      if (authRes) {
        // redirect if the user attempt to access the marketplace through the route that doesn't match his account type
        const isMarketplace = pathname.match(/^\/marketplace\/(brand|branch)/);

        const accountType = request.cookies.get('accountType')?.value;

        const shouldRedirect =
          accountType === 'brand'
            ? pathname.match(/^\/marketplace\/(branch)/)
            : pathname.match(/^\/marketplace\/(brand)/);

        if (isMarketplace && shouldRedirect) {
          return NextResponse.redirect(
            new URL(`/marketplace/${accountType}/home`, config.baseUrl)
          );
        }

        // redirect from register page to brand/branch register page if the user has already an account
        // but not a brand/branch account
        const isRegister = pathname.match(
          /^\/sign-up\/(brand|branch)\/register$/
        );
        if (!authRes.registered && !isRegister) {
          return NextResponse.redirect(
            new URL(`/sign-up/${authRes.accountType}/register`, config.baseUrl)
          );
        }

        if (isRegister && authRes.registered) {
          return NextResponse.redirect(
            new URL(`/marketplace/${accountType}/home`, config.baseUrl)
          );
        }

        // redirect from login pages to home page if the user is already logged in
        if (isLoginPage) {
          return NextResponse.redirect(
            new URL(`/marketplace/${accountType}/home`, config.baseUrl)
          );
        }
      } else {
        if (!isLoginPage) {
          return NextResponse.redirect(
            new URL(`/sign-in?redirect=${request.nextUrl.href}`, config.baseUrl)
          );
        }
      }
    }

    return langMiddleware(request, locale);
  }
}

async function authMiddleware(request: NextRequest) {
  try {
    const session = request.cookies.get('session');

    //Return to /sign-in if don't have a session
    if (!session) {
      return false;
    }

    //Call the authentication endpoint
    const claims = await http({
      url: `${config.baseUrl}/api/auth`,
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });

    return claims;
  } catch (error) {
    console.error(error);
  }
}

function langMiddleware(request: NextRequest, locale: string) {
  const { href } = request.nextUrl;
  const port = process.env.NEXT_PUBLIC_PORT;
  const [, pathname] = href.split(port!);

  const cookieLang = request.cookies.get('lang')?.value;

  // Redirect if there is no locale
  if (!locale) {
    const lang = cookieLang || i18n.defaultLocale;

    const response = NextResponse.redirect(
      new URL(
        `/${lang}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        config.baseUrl
      )
      // { status: 302 }
    );

    response.cookies.set({
      name: 'lang',
      value: lang,
    });

    return response;
  }

  const response = NextResponse.next();
  response.cookies.set({
    name: 'lang',
    value: locale,
  });

  return response;
}
