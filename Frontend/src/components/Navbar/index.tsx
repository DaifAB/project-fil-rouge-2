'use client';

import Link from 'next/link';
import Languages from '../Languages';
import MarketplaceNavigation from './MarketplaceNavigation';
import MobileSidebar from './MobileSidebar';
import Navigation from './Navigation';
import { Dictionary } from '@/types/interfaces';
import Image from 'next/image';

interface Props {
  dict: Dictionary;
  lang: string;
}

function Header({ dict, lang }: Props) {
  return (
    <header
      className={`fixed z-40 h-header-height bg-primary w-full top-0 px-5 md:px-10 flex justify-between items-center text-gray-600 shadow-lg`}
    >
      <Link href={`/${lang}`} className="pb-0">
        <Image
          src="/assets/images/logo.png"
          height="50"
          width="250"
          alt="Logo Tasty Bridge"
        />
      </Link>

      <div className="gap-4 md:gap-7 hidden md:flex items-center text-white">
        <Navigation dict={dict} />
      </div>

      <MobileSidebar lang={lang}>
        <MarketplaceNavigation dict={dict} />
        <div className="h-5"></div>
        <Navigation dict={dict} />
        <div className="ml-auto">
          <Languages lang={lang} />
        </div>
      </MobileSidebar>
    </header>
  );
}

export default Header;
