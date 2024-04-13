'use client';

import Loading from '@/components/Loading';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationStepOne from '@/components/marketplace/kitchen/brands/application/ApplicationStepOne';
import { AuthUserContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { KitchenService } from '@/services/client/kitchen';
import { PageProps } from '@/types/interfaces';
import { useContext } from 'react';

function Page({ params: { lang, applicationId } }: PageProps) {
  const dict = dictionaries[lang];

  const [authUser] = useContext(AuthUserContext);
  const account = authUser?.user?.accounts?.[0];
  const branchesIds = account?.branches as string[];

  const { data: application, loading: applicationLoading } = useFetch(null, {
    async fetch() {
      return await ApplicationService.getApplication(applicationId);
    },
  });

  const { data: branches, loading: kitchensLoading } = useFetch(
    null,
    {
      async fetch() {
        return await Promise.all(
          branchesIds.map((branchId) => KitchenService.getKitchen(branchId))
        );
      },
    },
    [branchesIds]
  );

  return (
    <TransitionPageWrapper title={dict.pagesTitles?.applicationCreation}>
      <Loading loading={applicationLoading || kitchensLoading}>
        {branches && (
          <ApplicationStepOne
            dict={dict}
            application={application}
            branches={branches || []}
          />
        )}
      </Loading>
    </TransitionPageWrapper>
  );
}

export default Page;
