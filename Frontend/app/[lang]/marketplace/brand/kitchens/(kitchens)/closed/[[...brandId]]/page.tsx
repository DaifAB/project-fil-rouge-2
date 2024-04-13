import ClosedKitchens from '@/components/marketplace/brand/tabs/ClosedKitchens';
import DiscoverKitchensLayout from '@/components/marketplace/brand/tabs/DiscoverKitchensLayout';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, brandId } }: PageProps) {
	return (
		<DiscoverKitchensLayout lang={lang} brandId={brandId?.[0]}>
			<ClosedKitchens lang={lang} brandId={brandId?.[0]} />
		</DiscoverKitchensLayout>
	);
}

export default Page;
