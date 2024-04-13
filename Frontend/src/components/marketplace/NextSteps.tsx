import { Dictionary } from '@/types/interfaces';
import React from 'react';

interface Props {
	children?: React.ReactNode;
	dict: Dictionary;
}

function NextSteps({ children, dict }: Props) {
	return (
		<div className='mb-2'>
			<div className='h4 mb-1'>
				{dict.marketplace?.brands?.application?.nextSteps}
			</div>
			<p className='t1 max-w-lg'>
				{dict.marketplace?.brands?.application?.nextStepsDesc}
			</p>
			<div className='mt-4 mb-8'>{children}</div>
		</div>
	);
}

export default NextSteps;
