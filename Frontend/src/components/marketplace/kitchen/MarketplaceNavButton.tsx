'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface Props {
	title?: string;
	route: string;
	lang: string;
}

const MarketplaceNavButton = ({ title, route, lang }: Props) => {
	const path = usePathname();
	const isActive = path.includes(route);

	return (
		<Link href={`/${lang}${route}`}>
			<button
				className={twMerge(
					'py-2 px-10 rounded-full bg-white border border-gray text-xs font-bold uppercase w-full ',
					isActive ? 'text-white bg-black' : ''
				)}
			>
				{title}
			</button>
		</Link>
	);
};

export default MarketplaceNavButton;
