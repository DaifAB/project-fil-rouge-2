'use client';

import { twMerge } from 'tailwind-merge';
import './styles.css';
import SliderLandmark from './SliderLandmark';

interface Props {
	className?: string;
	value: number;
	onChange?: any;
	landmarks?: number[];
	init?: number;
	min?: number;
	max: number;
	name: string;
}

const Slider = (props: Props) => {
	const { className, onChange, value, name, min = 0, max, landmarks } = props;

	return (
		<div className={twMerge('mb-4 w-full')}>
			{landmarks && (
				<div className='relative p-5'>
					{[min, value, max].map((value, index) => {
						return (
							<SliderLandmark key={index} value={value} min={min} max={max} />
						);
					})}
				</div>
			)}

			<input
				type='range'
				min={min}
				max={max}
				onChange={(e) => onChange(name, Number(e.target.value))}
				className='w-full'
				style={{
					backgroundSize: `${((value - min) * 100) / (max - min)}% 100%`,
				}}
				value={value}
			/>
		</div>
	);
};

export default Slider;
