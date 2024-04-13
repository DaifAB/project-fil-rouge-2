import DiscoverBrandsLayout from '@/components/marketplace/kitchen/tabs/DiscoverBrandsLayout';
import OngoingBrands from '@/components/marketplace/kitchen/tabs/OngoingBrands';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, kitchenId } }: PageProps) {
	return (
		<DiscoverBrandsLayout lang={lang} kitchenId={kitchenId?.[0]}>
			<OngoingBrands lang={lang} kitchenId={kitchenId?.[0]} />
		</DiscoverBrandsLayout>
	);
}

export default Page;
