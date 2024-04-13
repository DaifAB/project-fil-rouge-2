import DiscoverTabs from '@/components/marketplace/DiscoverTabs';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { BrandService } from '@/services/server/brand';
import { Locale } from '@/types/types';

interface Props {
  children: React.ReactNode;
  lang: Locale;
  brandId: string;
}

async function DiscoverKitchensLayout({ children, lang, brandId }: Props) {
  const dict = dictionaries[lang];
  const user = await AuthService.getConnectedUser();
  const [account] = user.accounts;
  const conceptsIds = account.concepts as string[];
  const concepts = await Promise.all(
    conceptsIds.map((conceptId) => BrandService.getBrand(conceptId))
  );

  const conceptId = brandId || (concepts[0]?._id as string);

  const routes = [
    {
      title: dict?.marketplaceNavigation?.ongoingApplications,
      route: '/marketplace/brand/kitchens/ongoing',
    },
    {
      title: dict?.marketplaceNavigation?.closedApplications,
      route: '/marketplace/brand/kitchens/closed',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <DiscoverTabs
        title={dict.marketplace?.kitchens?.kitchenApplications}
        description={dict.marketplace?.kitchens?.kitchenApplicationsDesc}
        dict={dict}
        entities={concepts}
        selectedEntityId={conceptId}
        routes={routes}
        from="brand"
        lang={lang}
      />
      {children}
    </div>
  );
}

export default DiscoverKitchensLayout;
