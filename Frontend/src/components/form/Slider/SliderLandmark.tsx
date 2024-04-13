interface Props {
	value: number;
	min: number;
	max: number;
}

function SliderLandmark({ value, min, max }: Props) {
	const landmarkMinusMin = value - min;
	const maxMinusMin = max - min;

	const isLeft = (landmarkMinusMin * 100) / maxMinusMin < 50;

	return (
		<div
			className='absolute top-3 text-secondary font-bold'
			style={{
				[isLeft ? 'left' : 'right']: `${
					((isLeft ? landmarkMinusMin : maxMinusMin - landmarkMinusMin) * 100) /
					maxMinusMin
				}%`,
				transform: isLeft ? 'translateX(-50%)' : 'translateX(50%)',
			}}
		>
			{value}
		</div>
	);
}

export default SliderLandmark;
