import usePath from '@/hooks/usePath';
import { Dictionary } from '@/types/interfaces';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
	isSelected: boolean;
	name: string;
	address: string;
	link: string;
	image: string;
	branchId: string;
	dict?: Dictionary;
}

function KitchenCard({
	isSelected,
	branchId,
	name,
	address,
	link,
	image,
	dict,
}: Props) {
	const [showCard, setShowCard] = useState(isSelected);

	const handleShowCard = () => {
		setShowCard(true);
	};

	const handleHideCard = () => {
		if (isSelected) {
			return;
		}
		setShowCard(false);
	};

	return (
		<div onMouseLeave={handleHideCard}>
			{showCard && (
				<div className='shadow-lg w-73 p-3 bg-white'>
					<div className='flex'>
						<Image
							className='mr-2'
							src={image}
							alt=''
							width={77}
							height={77}
						/>
						<div>
							<div className='text-base font-bold	'>{name}</div>
							<div className='text-xs text-gray mb-3'>{address}</div>
							<Link
								href={`/${dict?.lang}/marketplace/branch/brands/search/${branchId}`}
								className='flex items-center text-primary'
							>
								<div className='italic underline capitalize text-sm'>
									{dict?.common?.seeAvailableBrands}
								</div>
							</Link>
							<Link
								href={link}
								className='flex items-center text-primary'
								target='_blank'
							>
								<FontAwesomeIcon
									icon={faExternalLink}
									className='w-3 h-3 mr-1'
								/>
								<div className='italic underline capitalize text-sm'>
									{dict?.common?.manageYourKitchen}
								</div>
							</Link>
						</div>
					</div>
				</div>
			)}

			<div
				className='w-6 h-6 bg-primary rounded-full mx-auto mt-3'
				onMouseEnter={handleShowCard}
			/>
		</div>
	);
}

export default KitchenCard;
