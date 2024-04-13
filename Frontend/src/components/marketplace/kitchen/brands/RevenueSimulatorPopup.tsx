'use client';

import Popup from '@/components/Popup';
import Slider from '@/components/form/Slider';
import useForm from '@/hooks/useForm';
import usePopup from '@/hooks/usePopup';
import { Dictionary } from '@/types/interfaces';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';

interface Props {
	dict: Dictionary;
	commission: number;
	cogs: number;
}

function RevenueSimulatorPopup({ dict, commission, cogs }: Props) {
	const [open, handleToggle] = usePopup();

	const { register, formState } = useForm({
		ordersPerDay: {
			init: 9,
		},
		avgOrderValue: {
			init: 15,
		},
	});

	const dailyRevenue = Math.round(
		formState.ordersPerDay *
			formState.avgOrderValue *
			(1 - (commission || 5) / 100 - ((cogs || 30) / 100) - 0.3)
	);
	const monthlyRevenue = dailyRevenue * 30;
	const annualRevenue = dailyRevenue * 365;

	return (
		<>
			<div
				className='flex items-center underline cursor-pointer'
				onClick={handleToggle}
			>
				<FontAwesomeIcon
					icon={faExternalLink}
					className='w-4 h-4 mr-2 text-primary'
				/>
				<div className={twMerge('t2 text-primary italic underline')}>
					{dict.marketplace?.brands?.profile?.simulateYourRevenues}
				</div>
			</div>

			<Popup
				title={dict.marketplace?.brands?.profile?.revenueSimulator}
				description={dict.marketplace?.brands?.profile?.revenueSimulatorDesc}
				showCloseButton
				open={open}
				onClose={handleToggle}
			>
				<div className='w-full gap-y-3 gap-x-16 grid grid-cols-2 md:grid-cols-4'>
					<div className='order-1 col-span-2'>
						<div className={twMerge('h5 text-secondary')}>
							{dict.marketplace?.brands?.profile?.ordersPerDay}
						</div>
						<Slider
							{...register('ordersPerDay')}
							max={30}
							landmarks={[0, 9, 30]}
						/>
					</div>

					<div className='order-3 md:order-2 col-span-1 md:col-span-2'>
						<div className={twMerge('h5 text-secondary')}>
							{dict.marketplace?.brands?.profile?.monthly}
						</div>
						<div className='font-bold text-secondary text-4xl'>
							{monthlyRevenue} $
						</div>
					</div>

					<div className='order-2 md:order-3 col-span-2'>
						<div className={twMerge('h5 text-secondary')}>
							{dict.marketplace?.brands?.profile?.averageOrderValue}
						</div>
						<Slider
							{...register('avgOrderValue')}
							min={10}
							max={50}
							landmarks={[10, 15, 50]}
						/>
					</div>

					<div className='order-4 col-span-1 md:col-span-2'>
						<div className={twMerge('h5 text-secondary')}>
							{dict.marketplace?.brands?.profile?.annually}
						</div>
						<div className='font-bold text-secondary text-4xl'>
							{annualRevenue} $
						</div>
					</div>
				</div>

				<p className='t3 mt-3'>
					*{dict.marketplace?.brands?.profile?.revenueSimulatorHint}
				</p>
			</Popup>
		</>
	);
}

export default RevenueSimulatorPopup;
