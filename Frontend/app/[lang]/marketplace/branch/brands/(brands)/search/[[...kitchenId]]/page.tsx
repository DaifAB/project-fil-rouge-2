import DiscoverBrandsLayout from '@/components/marketplace/kitchen/tabs/DiscoverBrandsLayout';
import SearchBrands from '@/components/marketplace/kitchen/tabs/SearchBrands';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, kitchenId } }: PageProps) {
	return (
		<DiscoverBrandsLayout lang={lang} kitchenId={kitchenId?.[0]}>
			<SearchBrands lang={lang} kitchenId={kitchenId?.[0]} />
		</DiscoverBrandsLayout>
	);
}

export default Page;
