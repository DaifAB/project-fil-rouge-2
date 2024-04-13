'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationDetails from '@/components/marketplace/ApplicationDetails';
import MarketFooter from '@/components/marketplace/MarketFooter';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { Concept, PageProps } from '@/types/interfaces';
import { fillString } from '@/utils/helpers';
import Link from 'next/link';

function Page({ params: { lang, applicationId } }: PageProps) {
  const dict = dictionaries[lang];

  const {
    data: application,
    loading,
    error,
    refetch,
  } = useFetch(null, {
    async fetch() {
      return await ApplicationService.getApplication(applicationId);
    },
  });

  return (
    <TransitionPageWrapper
      title={fillString(dict.pagesTitles?.applicationDetails)}
      className="h-full flex flex-col justify-between"
    >
      <Loading loading={loading}>
        <ApplicationDetails
          application={application}
          dict={dict}
          mode="branch"
          refetchApplication={refetch}
        />
      </Loading>
      <MarketFooter className="sticky left-0 right-0 bottom-0">
        <div className="flex flex-col md:flex-row gap-3">
          <Link href={`/${lang}/marketplace/branch/brands/ongoing`}>
            <Button className="bg-heavy-gray w-full">
              {dict.marketplace?.brands?.application?.closeApplication}
            </Button>
          </Link>
          <NeedHelpPopup dict={dict} />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href={`/${lang}/marketplace/branch/brands/profile/${
              (application?.branchApplication?.concept as Concept)?._id
            }`}
          >
            <Button className="bg-primary w-full">
              {dict.marketplace?.brands?.application?.brandDetails}
            </Button>
          </Link>
        </div>
      </MarketFooter>
    </TransitionPageWrapper>
  );
}

export default Page;
