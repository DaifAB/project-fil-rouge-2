import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	children: React.ReactNode;
	className?: string;
}

function Chip({ className, children }: Props) {
	return (
		<div
			className={twMerge(
				't5 bg-black text-white rounded-full px-4 capitalize',
				className
			)}
		>
			{children}
		</div>
	);
}

export default Chip;
