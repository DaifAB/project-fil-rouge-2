import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { BrandService } from '@/services/server/brand';
import { KitchenService } from '@/services/server/kitchen';
import { GetAvailableBrandsResponse } from '@/types/responses';
import { Locale } from '@/types/types';
import GeoSearchBrands from '../search';

interface Props {
  lang: Locale;
  kitchenId: string;
}

async function SearchBrands({ lang, kitchenId }: Props) {
  const dict = dictionaries[lang];

  const user = await AuthService.getConnectedUser();
  const account = user.accounts[0];
  const branchesIds = account.branches as string[];
  const branches = await Promise.all(
    branchesIds.map((branchId) => KitchenService.getKitchen(branchId))
  );
  const branchId = kitchenId || (branches[0]?._id as string);
  const branch = branches.find((branch) => branch._id === branchId);

  let availableBrands: GetAvailableBrandsResponse[] = [];
  if (branch) {
    availableBrands = await BrandService.getAvailableBrands(branchId);
  }

  return (
    <TransitionPageWrapper
      title={dict.pagesTitles?.searchBrands}
      className="h-screen w-full relative"
    >
      <GeoSearchBrands
        dict={dict}
        brands={availableBrands}
        selectedBranch={branch!}
        branches={branches}
        lang={lang}
      />
    </TransitionPageWrapper>
  );
}

export default SearchBrands;
