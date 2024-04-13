import ClosedBrands from '@/components/marketplace/kitchen/tabs/ClosedBrands';
import DiscoverBrandsLayout from '@/components/marketplace/kitchen/tabs/DiscoverBrandsLayout';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, kitchenId } }: PageProps) {
	return (
		<DiscoverBrandsLayout lang={lang} kitchenId={kitchenId?.[0]}>
			<ClosedBrands lang={lang} kitchenId={kitchenId?.[0]} />
		</DiscoverBrandsLayout>
	);
}

export default Page;
