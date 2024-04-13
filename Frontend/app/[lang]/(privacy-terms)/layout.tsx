'use client';

import Tabs from '@/components/Tabs';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import usePath from '@/hooks/usePath';
import { dictionaries } from '@/i18n';
import { LayoutProps } from '@/types/interfaces';
import Link from 'next/link';

function Layout({ children, params: { lang } }: LayoutProps) {
  const dict = dictionaries[lang];

  const path = usePath();

  const tabs = [
    {
      name: dict.privacyTerms?.privacyPolicy?.tabTitle,
      path: '/privacy-policy',
    },
    { name: dict.privacyTerms?.termsOfUse?.tabTitle, path: '/terms-of-use' },
  ];

  const selectedIndex = tabs.findIndex(
    (tab) => tab.path === `/${path.split('/')[0]}`
  );

  return (
    <TransitionPageWrapper className="overflow-x-hidden">
      <div className="bg-black text-white px-5 md:px-40 ">
        <div className="h1 py-7 font-medium">{dict.privacyTerms?.title}</div>

        <Tabs selectedIndex={selectedIndex}>
          {tabs.map((tab, index) => (
            <Link
              key={index}
              href={`/${lang}/${tab.path}`}
              className="font-medium"
            >
              {tab.name}
            </Link>
          ))}
        </Tabs>
      </div>
      <div className="px-5 md:px-40 py-10">{children}</div>
    </TransitionPageWrapper>
  );
}

export default Layout;
