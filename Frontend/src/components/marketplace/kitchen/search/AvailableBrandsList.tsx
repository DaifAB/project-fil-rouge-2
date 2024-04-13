import Button from '@/components/Button';
import { Dictionary } from '@/types/interfaces';
import { GetAvailableBrandsResponse } from '@/types/responses';
import { Locale } from '@/types/types';
import { Branch, City, Country } from '@/types/interfaces';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import MarketplaceCard from '../../MarketplaceCard';

interface Props {
  onToggleOpen: () => void;
  open: boolean;
  dict: Dictionary;
  brands: GetAvailableBrandsResponse[];
  branch: Branch;
  lang: Locale;
}

function AvailableBrandsList({
  onToggleOpen,
  open,
  dict,
  brands,
  branch,
  lang,
}: Props) {
  return (
    <div className="px-5 absolute bottom-5 mx-auto left-1/2 -translate-x-1/2 w-full">
      <div className="shadow-lg bg-white rounded-lg p-4 transition-all duration-500">
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="h4 font-medium">
              {dict.marketplace?.brands?.search?.availableBrands}
            </div>
            <button
              className="text-sm text-gray-500 hover:text-gray-700"
              onClick={onToggleOpen}
            >
              <FontAwesomeIcon
                icon={open ? faChevronDown : faChevronUp}
                className="w-5 h-5 cursor-pointer"
              />
            </button>
          </div>
          {open && (
            <p className="t1 max-w-xl">
              {dict.marketplace?.brands?.search?.availableBrandsDesc}
            </p>
          )}
        </div>

        {open && brands.length === 0 && (
          <div className="inline-block p-5 border border-zinc-400">
            <div className="font-bold text-base text-gray">
              {dict.marketplace?.brands?.search?.noBrandAvailable}
            </div>
            <p className="t3 mt-5 flex justify-center">
              <Link href={`/${lang}/contact-us`} target="_blank">
                <Button className="py-1 italic text-xs">
                  {dict.marketplace?.brands?.search?.noBrandAvailableLink}
                </Button>
              </Link>
            </p>
          </div>
        )}

        {open && (
          <div className="flex gap-6 overflow-x-auto">
            {brands.map((brand) => {
              const disabled = branch.concepts?.some(
                (concept) => concept === brand._id
              );
              const country = (brand.cookedIn as Country).name;
              return (
                <MarketplaceCard key={brand._id} brand={brand} lang={lang}>
                  <p className="text-xs italic font-bold text-gray mb-2">
                    {dict.marketplace?.brands?.search?.cookedByText
                      ?.replace('{country}', country)
                      .replace('{cookedBy}', brand?.cookedBy.toString())}
                  </p>
                  <div className="flex justify-center w-full">
                    <Link
                      href={`/${dict.lang}/marketplace/branch/brands/profile/${brand._id}`}
                      target="_blank"
                    >
                      <Button
                        className="py-1 italic text-xs"
                        disabled={disabled}
                      >
                        {disabled
                          ? dict.marketplace?.brands?.search?.alreadyCooking
                          : dict.marketplace?.brands?.search?.discoverMore}
                      </Button>
                    </Link>
                  </div>
                </MarketplaceCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableBrandsList;
