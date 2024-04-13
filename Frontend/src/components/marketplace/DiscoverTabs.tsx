'use client';

import MarketplaceNavButton from './kitchen/MarketplaceNavButton';

import Select from '@/components/form/Select';
import { Branch, Concept, Dictionary } from '@/types/interfaces';
import { AccountType } from '@/types/types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  title?: string;
  description?: string;
  dict: Dictionary;
  selectedEntityId: string;
  entities: Branch[] | Concept[];
  from: AccountType;
  lang: string;
  routes: {
    title: string | undefined;
    route: string;
  }[];
}

function DiscoverTabs({
  title,
  description,
  dict,
  entities,
  selectedEntityId,
  routes,
  from,
  lang,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeBranch = (_: string, value: string) => {
    const path = pathname.split('/').slice(0, 6).join('/');
    router.push(`${path}/${value}`);
  };

  const options: { label?: string | undefined; value: string | number }[] =
    entities.map((entity) => ({
      label: (from === 'branch'
        ? entity.name
        : (entity as Concept).name) as string,
      value: entity._id,
    }));

  return (
    <div className="p-5">
      <div className="h4 mb-1">{title}</div>
      <p className="t1 max-w-xl">{description}</p>

      <div className="flex mt-4 gap-3 flex-col md:flex-row md:gap-8">
        {routes.map((route, index) => {
          return (
            <MarketplaceNavButton
              title={route.title}
              route={route.route}
              lang={dict.lang!}
              key={index}
            />
          );
        })}
      </div>

      {!pathname.includes('search') && (
        <Select
          className="w-full md:w-1/3 mt-2 mb-0"
          label={
            from === 'branch'
              ? dict.common?.selectYourKitchen
              : dict.common?.selectYourBrand
          }
          name="0"
          options={options}
          value={selectedEntityId}
          onChange={handleChangeBranch}
        />
      )}

      <Link
        href={`/${lang}/marketplace/${from}/${
          from === 'branch' ? 'kitchens' : 'brands'
        }`}
        className="flex items-center text-primary mt-2"
      >
        <div className="italic underline capitalize text-sm">
          {from === 'branch'
            ? dict.marketplace?.brands?.search?.noKitchen
            : dict.marketplace?.brands?.search?.noBrand}
        </div>
      </Link>
    </div>
  );
}

export default DiscoverTabs;
