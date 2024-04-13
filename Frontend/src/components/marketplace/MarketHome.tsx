'use client';

import { Dictionary } from '@/types/interfaces';
import NeedHelp from '../NeedHelp';
import StatisticCard from './StatisticCard';
import { useContext } from 'react';

interface Props {
  dict: Dictionary;
  userName?: string | null;
  welcomeDesc: string | undefined;
  branchesCount?: number;
  signedBrandsCount?: number;
  appliedBrandsCount?: number;
  type: 'branch' | 'brand';
  managedBrandsCount?: number;
  kitchensSignedCount?: number;
  applicationsCount?: number;
}

function MarketHome({
  dict,
  userName,
  branchesCount,
  signedBrandsCount,
  appliedBrandsCount,
  welcomeDesc,
  type,
  managedBrandsCount,
  kitchensSignedCount,
  applicationsCount,
}: Props) {
  const statistics =
    type === 'branch'
      ? [
          {
            title: dict?.marketplace?.home?.kitchenManaged,
            value: branchesCount,
            link: '/marketplace/branch/kitchens',
            linkText: dict?.marketplace?.home?.goToMyKitchens,
          },
          {
            title: dict?.marketplace?.home?.brandsSigned,
            value: signedBrandsCount,
            link: '/marketplace/branch/brands/closed',
            linkText: dict?.marketplace?.home?.goToBrandsSigned,
          },
          {
            title: dict?.marketplace?.home?.brandsAppliedTo,
            value: appliedBrandsCount,
            link: '/marketplace/branch/brands/ongoing',
            linkText: dict?.marketplace?.home?.goToBrandsAppliedTo,
          },
        ]
      : [
          {
            title: dict?.marketplace?.home?.brandManaged,
            value: managedBrandsCount,
            link: '/marketplace/brand/brands',
            linkText: dict?.marketplace?.home?.goToMyBrands,
          },
          {
            title: dict?.marketplace?.home?.kitchenSigned,
            value: kitchensSignedCount,
            link: '/marketplace/brand/kitchens/closed',
            linkText: dict?.marketplace?.home?.goToKitchensSigned,
          },
          {
            title: dict?.marketplace?.home?.applications,
            value: applicationsCount,
            link: '/marketplace/brand/kitchens/ongoing',
            linkText: dict?.marketplace?.home?.goToApplications,
          },
        ];

  return (
    <div className="flex flex-col px-10 mx-auto py-20">
      <div className="mb-10">
        <div className="h3 mb-1 text-center">
          {dict?.marketplace?.home?.welcome} {userName},
        </div>
        <p className="t1 text-center mx-auto max-w-xl">{welcomeDesc}</p>
      </div>
      <div className="h4 mb-4 uppercase">
        {dict?.marketplace?.home?.yourPerformance}
      </div>
      <div className="flex gap-3 flex-col lg:flex-row mb-14">
        {statistics.map((statistic, index) => (
          <StatisticCard
            key={index}
            title={statistic.title}
            value={statistic?.value || 0}
            link={statistic.link}
            linkText={statistic.linkText}
            lang={dict.lang!}
          />
        ))}
      </div>
      <div className="h4 uppercase mb-4">
        {dict?.marketplace?.home?.needHelp}
      </div>
      <NeedHelp dict={dict} />
    </div>
  );
}

export default MarketHome;
