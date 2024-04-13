import DiscoverKitchensLayout from '@/components/marketplace/brand/tabs/DiscoverKitchensLayout';
import OngoingKitchens from '@/components/marketplace/brand/tabs/OngoingKitchens';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, brandId } }: PageProps) {
	return (
		<DiscoverKitchensLayout lang={lang} brandId={brandId?.[0]}>
			<OngoingKitchens lang={lang} brandId={brandId?.[0]} />
		</DiscoverKitchensLayout>
	);
}

export default Page;
