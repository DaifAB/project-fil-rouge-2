'use client';

import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import MarketHome from '@/components/marketplace/MarketHome';
import { AuthUserContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { PageProps } from '@/types/interfaces';
import { useContext } from 'react';

function Page({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];

  const [authUser] = useContext(AuthUserContext);

  const [account] = authUser?.user?.accounts || [];

  const { data: applications } = useFetch(
    [],
    {
      async fetch() {
        return await ApplicationService.getApplications([
          'reviewing',
          'reviewed',
        ]);
      },
    },
    []
  );

  return (
    <TransitionPageWrapper title={dict.pagesTitles?.marketPlace}>
      <MarketHome
        type="brand"
        dict={dict}
        userName={authUser?.name}
        managedBrandsCount={account?.concepts.length}
        kitchensSignedCount={account?.branches.length}
        applicationsCount={applications.length}
        welcomeDesc={dict?.marketplace?.home?.welcomeDescBrand}
      />
    </TransitionPageWrapper>
  );
}

export default Page;
