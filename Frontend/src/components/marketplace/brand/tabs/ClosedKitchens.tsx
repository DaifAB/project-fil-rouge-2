'use client';

import Loading from '@/components/Loading';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationsList from '@/components/marketplace/kitchen/ApplicationsList';
import { closedStatus } from '@/config/constants';
import { AuthUserContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { Locale } from '@/types/types';
import { Application } from '@/types/interfaces';
import { useContext } from 'react';

interface Props {
  brandId: string;
  lang: Locale;
}

function ClosedKitchens({ lang, brandId }: Props) {
  const dict = dictionaries[lang];
  const [authUser] = useContext(AuthUserContext);
  const account = authUser?.user?.accounts?.[0];
  const conceptsIds = account?.concepts as string[];
  const conceptId = brandId || conceptsIds?.[0];

  const { data: applications, loading } = useFetch(
    [],
    {
      async fetch() {
        if (!conceptId || !authUser) return [];
        return await ApplicationService.getApplications(
          closedStatus,
          null,
          conceptId
        );
      },
    },
    [conceptId, authUser]
  );

  const signedApplications = applications.filter(
    (application: Application) => application.status === 'signed'
  );

  const rejectedApplications = applications.filter(
    (application: Application) => application.status === 'rejected'
  );

  if (!authUser) {
    return null;
  }

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.closedApplications}
      className="px-5"
    >
      <Loading loading={loading}>
        <>
          <div className="mb-5">
            <ApplicationsList
              applications={signedApplications}
              dict={dict}
              lang={lang}
              title={dict.marketplace?.brands?.signed?.kitchensYouSigned}
              from="brand"
            />
          </div>

          <div className="mb-10">
            <ApplicationsList
              applications={rejectedApplications}
              dict={dict}
              lang={lang}
              type="rejected"
              title={dict.marketplace?.brands?.signed?.rejectedApplications}
              from="brand"
            />
          </div>
        </>
      </Loading>
    </TransitionPageWrapper>
  );
}

export default ClosedKitchens;
