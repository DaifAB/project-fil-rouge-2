import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import MarketplaceCard from '@/components/marketplace/MarketplaceCard';
import { config } from '@/config';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { KitchenService } from '@/services/server/kitchen';
import { PageProps } from '@/types/interfaces';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

async function Page({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];
  const user = await AuthService.getConnectedUser();
  const [account] = user.accounts;
  const branchesIds = account.branches as string[];
  const branches = await Promise.all(
    branchesIds.map((id) => KitchenService.getKitchen(id))
  );

  return (
    <TransitionPageWrapper title={dict.pagesTitles?.myKitchens} className="p-5">
      <div className="flex gap-4 mb-2">
        <div className="h4">{dict.marketplaceNavigation?.myKitchens}</div>
        <Link href={`kitchens/create`}>
          <Button className="py-1 px-8 text-xs bg-primary flex items-center">
            {dict.marketplace?.kitchens?.addNewKitchen}
          </Button>
        </Link>
      </div>
      <div className="t1 max-w-lg mb-5">
        {dict.marketplace?.kitchens?.myKitchensDesc}
      </div>

      <div className="flex gap-6 flex-wrap">
        {branches.map((branch, index) => (
          <MarketplaceCard key={index} kitchen={branch} lang={lang} dict={dict}>
            <div className="flex gap-2 flex-wrap">
              <Link
                href={`/${lang}/marketplace/branch/kitchens/profile/${branch._id}`}
              >
                <Button className="py-1 px-4 text-xs bg-primary">
                  {dict.marketplace?.kitchens?.seePublicProfile}
                </Button>
              </Link>
              <Link href={`kitchens/create/${branch._id}`}>
                <Button className="py-1 px-4 text-xs bg-primary ">
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="w-2.5 h-2.5 mr-2 inline-block -mt-0.5"
                  />
                  {dict.marketplace?.kitchens?.manage}
                </Button>
              </Link>
            </div>
          </MarketplaceCard>
        ))}
      </div>
    </TransitionPageWrapper>
  );
}

export default Page;
