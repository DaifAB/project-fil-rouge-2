import { twMerge } from 'tailwind-merge';

interface Props {
	className?: string;
}

function Loader({ className }: Props) {
	return (
		<div
			className={twMerge(
				'rounded-full border-4 border-lightgray border-t-primary m-3 w-10 h-10 animate-spin mx-auto',
				className
			)}
		/>
	);
}

export default Loader;
