import Button from '@/components/Button';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import BrandProfile from '@/components/marketplace/BrandProfile';
import ApplyButton from '@/components/marketplace/kitchen/brands/profile/ApplyButton';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { BrandService } from '@/services/server/brand';
import { PageProps } from '@/types/interfaces';
import { fillString } from '@/utils/helpers';
import Link from 'next/link';

async function Page({ params: { lang, brandId } }: PageProps) {
  const dict = dictionaries[lang];

  const [user, brand] = await Promise.all([
    AuthService.getConnectedUser(),
    BrandService.getBrand(brandId as string),
  ]);

  const [account] = user.accounts;

  return (
    <TransitionPageWrapper
      title={fillString(dict.pagesTitles?.profile, brand.name)}
    >
      <BrandProfile
        brand={brand}
        lang={lang}
        dict={dict}
        footer={
          <>
            <div className="flex flex-col md:flex-row gap-3">
              <Link href={`/${lang}/marketplace/branch/brands/search`}>
                <Button className="bg-heavy-gray w-full">
                  {dict.common?.back}
                </Button>
              </Link>
              <NeedHelpPopup dict={dict} />
            </div>
            <ApplyButton
              dict={dict}
              brandId={brandId as string}
              accountId={account._id}
            />
          </>
        }
      />
    </TransitionPageWrapper>
  );
}

export default Page;
