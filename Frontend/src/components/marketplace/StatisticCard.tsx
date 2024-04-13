import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { Locale } from '@/types/types';

interface Props {
	title?: string;
	value: string | number;
	link?: string;
	width?: string;
	linkText?: string;
	lang: string;
}

function StatisticCard({
	title,
	value,
	link='',
	linkText,
	width = 'w-1/4',
	lang,
}: Props) {
	return (
		<div
			className={`w-full lg:${width} flex flex-col justify-center items-center border border-zinc-400 rounded-lg p-2`}
		>
			<div className={`h5 uppercase text-center`}>{title}</div>
			<p className='font-bold text-center text-gray text-5xl py-5'>{value}</p>
			{linkText && (
				<Link
					href={`/${lang}${link}`}
					className='flex items-center text-primary text-sm'
				>
					<FontAwesomeIcon icon={faExternalLink} className='w-4 h-4 mx-3' />
					<div className='italic underline capitalize'>{linkText}</div>
				</Link>
			)}
		</div>
	);
}

export default StatisticCard;
