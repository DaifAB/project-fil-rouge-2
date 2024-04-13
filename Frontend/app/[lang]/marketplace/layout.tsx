'use client';

import Languages from '@/components/Languages';
import MarketplaceNavigation from '@/components/Navbar/MarketplaceNavigation';
import Sidebar from '@/components/Navbar/Sidebar';
import { dictionaries } from '@/i18n';
import { LayoutProps } from '@/types/interfaces';

function Layout({ children, params: { lang } }: LayoutProps) {
  const dict = dictionaries[lang];

  return (
    <div className="flex w-full h-full">
      <Sidebar>
        <MarketplaceNavigation dict={dict} />
        <div className="mt-5">
          <Languages lang={lang} />
        </div>
      </Sidebar>
      <div className="h-full w-full overflow-auto md:w-[calc(100vw_-_theme(spacing.sidebar-width))]">
        {children}
      </div>
    </div>
  );
}

export default Layout;
