'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ShouldReviewPopup from '@/components/marketplace/Application/ShouldReviewPopup';
import ApplicationDetails from '@/components/marketplace/ApplicationDetails';
import MarketFooter from '@/components/marketplace/MarketFooter';
import useFetch from '@/hooks/useFetch';
import usePopup from '@/hooks/usePopup';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { Branch, PageProps } from '@/types/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Page({ params: { lang, applicationId } }: PageProps) {
  const dict = dictionaries[lang];
  const router = useRouter();
  const {
    data: application,
    loading,
    refetch,
  } = useFetch(null, {
    async fetch() {
      return await ApplicationService.getApplication(applicationId);
    },
  });
  const [openShouldReviewPopup, handleToggleShouldReviewPopup] = usePopup();

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.applicationDetails}
      className="h-full flex flex-col justify-between"
    >
      <Loading loading={loading}>
        <ApplicationDetails
          application={application}
          dict={dict}
          mode="brand"
          refetchApplication={refetch}
        />
      </Loading>
      <MarketFooter className="sticky left-0 right-0 bottom-0">
        <div className="flex flex-col md:flex-row gap-3">
          <Link href={`/${lang}/marketplace/brand/kitchens/ongoing`}>
            <Button className="bg-heavy-gray w-full">
              {dict.marketplace?.brands?.application?.closeApplication}
            </Button>
          </Link>
          <NeedHelpPopup dict={dict} />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Link
            href={`/${lang}/marketplace/brand/kitchens/profile/${
              (application?.branch as Branch)?._id
            }`}
            target="_blank"
          >
            <Button className="bg-primary w-full">
              {dict.marketplace?.brands?.application?.kitchenDetails}
            </Button>
          </Link>
        </div>
      </MarketFooter>
      <ShouldReviewPopup
        dict={dict}
        open={openShouldReviewPopup}
        onClose={handleToggleShouldReviewPopup}
      />
    </TransitionPageWrapper>
  );
}

export default Page;
