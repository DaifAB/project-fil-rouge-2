import DiscoverTabs from '@/components/marketplace/DiscoverTabs';
import { dictionaries } from '@/i18n';
import { AuthService } from '@/services/server/auth';
import { KitchenService } from '@/services/server/kitchen';
import { Locale } from '@/types/types';

interface Props {
	children: React.ReactNode;
	lang: Locale;
	kitchenId: string;
}

async function DiscoverBrandsLayout({ children, lang, kitchenId }: Props) {
	const dict = dictionaries[lang];

	const user = await AuthService.getConnectedUser();
	const [account] = user.accounts;
	const branchesIds = account.branches as string[];
	const branches = await Promise.all(
		branchesIds.map((branchId) => KitchenService.getKitchen(branchId))
	);

	const branchId = kitchenId || (branches[0]?._id as string);

	const routes = [
		{
			title: dict?.marketplaceNavigation?.searchNewBrands,
			route: '/marketplace/branch/brands/search',
		},
		{
			title: dict?.marketplaceNavigation?.ongoingApplications,
			route: '/marketplace/branch/brands/ongoing',
		},
		{
			title: dict?.marketplaceNavigation?.closedApplications,
			route: '/marketplace/branch/brands/closed',
		},
	];

	return (
		<div className='h-full flex flex-col'>
			<DiscoverTabs
				title={dict.marketplace?.brands?.search?.title}
				description={dict.marketplace?.brands?.search?.description}
				dict={dict}
				entities={branches}
				selectedEntityId={branchId}
				routes={routes}
				from='branch'
				lang={lang}
			/>
			{children}
		</div>
	);
}

export default DiscoverBrandsLayout;
