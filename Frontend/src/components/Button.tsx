import { twMerge } from 'tailwind-merge';
import Spinner from './Spinner';

interface Props {
	children: React.ReactNode;
	className?: string;
	onClick?: any;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	disabled?: boolean;
}

function Button({
	children,
	className = '',
	onClick,
	type,
	loading,
	disabled,
}: Props) {
	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={twMerge(
				'bg-primary rounded-full h-min hover:bg-opacity-90 text-white uppercase font-medium py-3 px-7 text-sm font-mono',
				className,
				disabled && 'bg-heavy-gray cursor-not-allowed'
			)}
		>
			{loading && <Spinner height={5} width={5} />}
			{children}
		</button>
	);
}

export default Button;
