'use client';

import Loading from '@/components/Loading';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import ApplicationStepTwo from '@/components/marketplace/kitchen/brands/application/ApplicationStepTwo';
import useFetch from '@/hooks/useFetch';
import { dictionaries } from '@/i18n';
import { ApplicationService } from '@/services/client/application';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang, applicationId } }: PageProps) {
	const dict = dictionaries[lang];

	const {
		data: application,
		loading,
		error,
	} = useFetch(null, {
		async fetch() {
			return await ApplicationService.getApplication(applicationId);
		},
	});

	return (
		<TransitionPageWrapper title={dict.pagesTitles?.applicationCreation}>
			<Loading loading={loading}>
				<ApplicationStepTwo dict={dict} application={application} />
			</Loading>
		</TransitionPageWrapper>
	);
}

export default Page;
