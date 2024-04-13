'use client';

import Loading from '@/components/Loading';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationsList from '@/components/marketplace/kitchen/ApplicationsList';
import { ongoingStatus } from '@/config/constants';
import { AuthUserContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { Locale } from '@/types/types';
import { useContext } from 'react';

interface Props {
  brandId: string;
  lang: Locale;
}

function OngoingKitchens({ lang, brandId }: Props) {
  const dict = dictionaries[lang];
  const [authUser] = useContext(AuthUserContext);
  const account = authUser?.user?.accounts?.[0];
  const conceptsIds = account?.concepts as string[];
  const conceptId = brandId || conceptsIds?.[0];

  const { data: applications, loading } = useFetch(
    [],
    {
      async fetch() {
        if (!conceptId || !authUser) {
          return [];
        }

        const _ongoingStatus = [...ongoingStatus];
        _ongoingStatus.shift();

        return await ApplicationService.getApplications(
          _ongoingStatus,
          null,
          conceptId
        );
      },
    },
    [conceptId]
  );

  console.log('applications', applications);

  if (!authUser) {
    return null;
  }

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.ongoingApplications}
      className="px-5"
    >
      <Loading loading={loading}>
        <ApplicationsList
          applications={applications}
          dict={dict}
          lang={lang}
          title={dict.marketplace?.brands?.ongoing?.ongoingApplications}
          from="brand"
        />
      </Loading>
    </TransitionPageWrapper>
  );
}

export default OngoingKitchens;
