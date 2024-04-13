'use client';

import Loading from '@/components/Loading';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationsList from '@/components/marketplace/kitchen/ApplicationsList';
import { ongoingStatus } from '@/config/constants';
import { AuthUserContext } from '@/contexts';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { Locale } from '@/types/types';
import { useContext } from 'react';

interface Props {
	lang: Locale;
	kitchenId: string;
}

function OngoingBrands({ lang, kitchenId }: Props) {
	const dict = dictionaries[lang];
	const [authUser] = useContext(AuthUserContext);
	const account = authUser?.user?.accounts?.[0];
	const branchesIds = account?.branches as string[];
	const branchId = kitchenId || branchesIds?.[0];

	const { data: applications, loading } = useFetch(
		[],
		{
			async fetch() {
				if (!branchId || !authUser) return [];
				return await ApplicationService.getApplications(
					ongoingStatus,
					branchId,
					null
				);
			},
		},
		[branchId, authUser]
	);

	if (!authUser) {
		return null;
	}

	return (
		<TransitionPageWrapper
			title={dict.pagesTitles?.ongoingApplications}
			className='px-5'
		>
			<Loading loading={loading}>
				<ApplicationsList
					applications={applications}
					dict={dict}
					lang={lang}
					title={dict.marketplace?.brands?.ongoing?.ongoingApplications}
				/>
			</Loading>
		</TransitionPageWrapper>
	);
}

export default OngoingBrands;
