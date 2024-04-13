import Button from '@/components/Button';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import BrandProfile from '@/components/marketplace/BrandProfile';
import { dictionaries } from '@/i18n';
import { BrandService } from '@/services/server/brand';
import { PageProps } from '@/types/interfaces';
import { fillString } from '@/utils/helpers';
import Link from 'next/link';

async function Page({ params: { lang, brandId } }: PageProps) {
  const dict = dictionaries[lang];

  const brand = await BrandService.getBrand(brandId as string);

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
              <Link href={`/${lang}/marketplace/brand/brands`}>
                <Button className="bg-heavy-gray w-full">
                  {dict.common?.back}
                </Button>
              </Link>
              <NeedHelpPopup dict={dict} />
            </div>
          </>
        }
      />
    </TransitionPageWrapper>
  );
}

export default Page;
