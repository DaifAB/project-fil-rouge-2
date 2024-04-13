import Button from '@/components/Button';
import NeedHelpPopup from '@/components/NeedHelpPopup';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import KitchenProfile from '@/components/marketplace/KitchenProfile';
import { dictionaries } from '@/i18n';
import { KitchenService } from '@/services/server/kitchen';
import { PageProps } from '@/types/interfaces';
import { fillString } from '@/utils/helpers';
import Link from 'next/link';

async function Page({ params: { lang, kitchenId } }: PageProps) {
  const dict = dictionaries[lang];

  const kitchen = await KitchenService.getKitchen(kitchenId as string);

  return (
    <TransitionPageWrapper
      title={fillString(dict.pagesTitles?.profile, kitchen.name)}
    >
      <KitchenProfile
        lang={lang}
        kitchen={kitchen}
        dict={dict}
        footer={
          <>
            <div className="flex flex-col md:flex-row gap-3">
              <Link href={`/${lang}/marketplace/branch/kitchens`}>
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
