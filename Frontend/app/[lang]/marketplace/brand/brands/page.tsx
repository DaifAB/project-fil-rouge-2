import Button from '@/components/Button';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import MarketplaceCard from '@/components/marketplace/MarketplaceCard';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { BrandService } from '@/services/server/brand';
import { PageProps } from '@/types/interfaces';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

async function Page({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];
  const user = await AuthService.getConnectedUser();
  const [account] = user.accounts;
  const conceptsIds = account.concepts as string[];

  const concepts = await Promise.all(
    conceptsIds.map((id) => BrandService.getBrand(id))
  );

  return (
    <TransitionPageWrapper title={dict.pagesTitles?.myBrands} className="p-5">
      <div className="flex gap-4 mb-2">
        <div className="h4">{dict.marketplaceNavigation?.myBrands}</div>
        <Link href={'brands/create'}>
          <Button className="py-1 px-8 text-xs bg-primary flex items-center">
            {dict.marketplace?.brands?.addNewBrand}
          </Button>
        </Link>
      </div>
      <div className="t1 max-w-lg mb-5">
        {dict.marketplace?.brands?.myBrandsDesc}
      </div>

      <div className="flex gap-6 flex-wrap">
        {concepts.map((concept, index) => (
          <MarketplaceCard key={index} brand={concept} lang={lang} dict={dict}>
            <div className="flex gap-2 flex-wrap">
              <Link
                href={`/${lang}/marketplace/brand/brands/profile/${concept._id}`}
              >
                <Button className="py-1 px-4 text-xs bg-primary">
                  {dict.marketplace?.kitchens?.seePublicProfile}
                </Button>
              </Link>
              <Link href={`brands/create/${concept._id}`}>
                <Button className="py-1 px-4 text-xs bg-primary flex items-center">
                  <FontAwesomeIcon
                    icon={faExternalLink}
                    className="w-2.5 h-2.5 mr-2"
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
