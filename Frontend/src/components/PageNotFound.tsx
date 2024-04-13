import { Dictionary } from '@/types/interfaces';
import Image from 'next/image';

interface Props {
	dict: Dictionary;
}

export default function NotFound({ dict }: Props) {
	return (
		<>
			<title>{dict.pagesTitles?.notFound}</title>
			<div
				className='w-full flex flex-col items-center justify-center px-5 text-center'
				style={{
					height: 'calc(100vh - 79px)',
				}}
			>
				<div className='h3 font-medium font-mono'>
					{dict.notFoundPage?.title}
				</div>
				<Image src='/assets/images/404.webp' alt='' width={300} height={300} />
				<div className='t1'>{dict.notFoundPage?.description}</div>
			</div>
		</>
	);
}
