'use client';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	className?: string;
	label?: React.ReactNode;
	value?: boolean;
	onChange?: any;
	error?: any;
	name: string;
	required?: boolean;
	disabled?: boolean;
}

const Checkbox = (props: Props) => {
	const {
		className,
		label = '',
		value = false,
		onChange,
		error = '',
		name,
		required = false,
		disabled = false,
		// ...rest
	} = props;

	const errorClass = error && 'text-danger';
	const handleToggle = () => {
		if (!disabled) {
			onChange(name, !value);
		}
	};

	return (
		<div className={twMerge('my-1 w-full', errorClass, className)}>
			<div
				className='flex gap-2 items-center cursor-pointer'
				onClick={handleToggle}
			>
				<div
					className={twMerge(
						'justify-center items-center p-1 rounded-sm',
						value ? 'bg-primary text-white' : 'bg-lightgray'
					)}
				>
					<FontAwesomeIcon
						icon={faCheck}
						className={twMerge(
							'w-4 h-4 text-white',
							!value && 'text-transparent'
						)}
					/>
				</div>
				<div>
					{label} {required && '*'}
				</div>
			</div>
			<div>
				{error && <div className='mt-2  text-sm font-medium'>{error}</div>}
			</div>
		</div>
	);
};

export default Checkbox;
