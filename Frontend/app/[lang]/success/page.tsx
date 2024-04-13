import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import React from 'react';
import { PageProps } from '@/types/interfaces';
import { dictionaries } from '@/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Page({ searchParams, params: { lang } }: PageProps) {
	const dict = dictionaries[lang];
	const title = dict.success?.[searchParams.type as keyof typeof dict.success];
	const description =
		dict.success?.[`${searchParams.type}Desc` as keyof typeof dict.success];

	return (
		<TransitionPageWrapper title={title}>
			<div
				className='w-full flex flex-col items-center justify-center px-5 text-center'
				style={{
					height: 'calc(100vh - 79px)',
				}}
			>
				<FontAwesomeIcon
					icon={faCheckCircle}
					className='w-28 h-28 text-primary mb-5'
				/>
				<div className='h3 font-medium font-mono text-primary'>{title}</div>
				<div className='t1'>{description}</div>
			</div>
		</TransitionPageWrapper>
	);
}

export default Page;
