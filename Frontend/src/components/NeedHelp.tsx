import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { Dictionary } from '@/types/interfaces';

interface Props {
	dict?: Dictionary;
}

function NeedHelp({ dict }: Props) {
	return (
		<>
			<div className='flex flex-col md:flex-row gap-4'>
				<div>
					<Image
						src='/assets/images/marketplace/market-home-img.png'
						alt={'image'}
						width={369}
						height={191}
						className='border border-zinc-400 rounded-lg'
					/>
				</div>
				<div>
					<div className='h4 mb-2'>
						{dict?.marketplace?.home?.needHelpTitle}
					</div>
					<p className='text-[22px] max-w-xl'>
						{dict?.marketplace?.home?.needHelpDesc}
					</p>
					<div className='my-5 flex gap-4'>
						<Link href='https://wa.me/212778100473' target='_blank'>
							<Button className=''>whatsapp</Button>
						</Link>
						<Link href={`/${dict?.lang}/contact-us`}>
							<Button className=' '>
								{dict?.marketplace?.home?.onlineForm}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default NeedHelp;
