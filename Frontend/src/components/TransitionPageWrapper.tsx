'use client';

import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface Props {
	children: React.ReactNode;
	className?: string;
	title?: string;
}

function TransitionPageWrapper({ children, className, title }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={twMerge('h-full', className)}
		>
      {title && <title>{title}</title>}
			{children}
		</motion.div>
	);
}

export default TransitionPageWrapper;
