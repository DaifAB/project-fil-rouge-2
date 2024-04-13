import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import { dictionaries } from '@/i18n';
import { PageProps } from '@/types/interfaces';

function Page({ params: { lang } }: PageProps) {
	const dict = dictionaries[lang];

	return (
		<TransitionPageWrapper title={dict.pagesTitles?.termsOfUse}>
			<div className='text-secondary font-semibold font-mono'>
				{dict.privacyTerms?.termsOfUse?.content?.title}
			</div>
			<br />
			{dict.privacyTerms?.termsOfUse?.content?.paragraphs?.map(
				(paragraph, index) =>
					paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
			)}
		</TransitionPageWrapper>
	);
}

export default Page;
