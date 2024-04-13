'use client';

import { config } from '@/config';
import useAccountType from '@/hooks/useAccountType';
import useLang from '@/hooks/useLang';
import usePath from '@/hooks/usePath';
import { Dictionary } from '@/types/interfaces';
import {
  faHamburger,
  faHome,
  faMessage,
  faStore,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Fragment, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  dict: Dictionary;
}

function MarketplaceNavigation({ dict }: Props) {
  const path = usePath();
  const pathAccountType = useAccountType();
  const accountType = Cookies.get('accountType') || pathAccountType || 'branch';

  const lang = useLang();

  const kitchenMarketplaceNavigation = [
    {
      title: dict?.marketplaceNavigation?.navigation,
      links: [
        { name: dict?.marketplaceNavigation?.home, icon: faHome, url: 'home' },
        {
          name: dict?.marketplaceNavigation?.discoverBrands,
          icon: faHamburger,
          url: 'brands/search',
        },
        {
          name: dict?.marketplaceNavigation?.myKitchens,
          icon: faStore,
          url: 'kitchens',
        },
      ],
    },
  ];

  const brandMarketplaceNavigation = [
    {
      title: dict?.marketplaceNavigation?.navigation,
      links: [
        { name: dict?.marketplaceNavigation?.home, icon: faHome, url: 'home' },
        {
          name: dict?.marketplaceNavigation?.discoverKitchens,
          icon: faHamburger,
          url: 'kitchens/ongoing',
        },
        {
          name: dict?.marketplaceNavigation?.myBrands,
          icon: faStore,
          url: 'brands',
        },
      ],
    },
  ];

  const marketplaceNavigation =
    accountType === 'branch'
      ? kitchenMarketplaceNavigation
      : brandMarketplaceNavigation;

  return marketplaceNavigation.map((item, i) => (
    <Fragment key={i}>
      <div className="h4 uppercase">{item.title}</div>
      {item.links.map((link, j) => (
        <Link
          key={j}
          href={
            i === 0
              ? `/${lang}/marketplace/${accountType}/${link.url}`
              : link.url
          }
          target={i === 0 ? '_self' : '_blank'}
          className={twMerge(
            'flex items-center gap-2 uppercase font-light hover:text-primary',
            path?.split('/')[2] === link.url.split('/')[0] && 'text-primary'
          )}
        >
          <div className="relative">
            <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
          </div>
          {link.name}
        </Link>
      ))}
    </Fragment>
  ));
}

export default MarketplaceNavigation;
