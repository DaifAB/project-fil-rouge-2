'use client';

import { nameRegex } from '@/config/regex';
import { countries } from '@/data/countries-phones';
import useForm from '@/hooks/useForm';
import { Dictionary } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../form/Input';
import Select from '../form/Select';
import AvatarPicker from './AvatarPicker';

const options = countries
	.map((country) => ({
		label: `${country.code} (${country.phoneCode})`,
		value: country.phoneCode,
		prefixImage: country.imageUrl,
	}))
	.sort((a, b) => a.label.localeCompare(b.label));

interface Props {
	dict: Dictionary;
	onSubmit: any;
	values?: any;
}

function RegistrationStepOne({ dict, onSubmit, values }: Props) {
	const { register, handleSubmit, reset } = useForm(
		{
			firstName: {
				init: '',
				required: {
					value: true,
				},
				pattern: {
					value: nameRegex,
				},
			},
			lastName: {
				init: '',
				required: {
					value: true,
				},
				pattern: {
					value: nameRegex,
				},
			},
			prefix: {
				init: '',
				required: {
					value: true,
				},
			},
			phone: {
				init: '',
				required: {
					value: true,
				},
			},
		},
		{
			dict,
			onSubmit(formState) {
				onSubmit({
					...formState,
					phone: formState.prefix.slice(1) + formState.phone,
					avatar: avatarUrl,
				});
			},
		}
	);

	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

	useEffect(() => {
		if (values?.firstName) {
			setAvatarUrl(values?.avatar);
			reset({
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
			});
		}
	}, []);

	const handleAvatarUpload = (imageUrl: string) => {
		setAvatarUrl(imageUrl);
	};

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<AvatarPicker
				onImageUpload={handleAvatarUpload}
				value={avatarUrl}
				dict={dict}
			/>

			<Input
				{...register('firstName')}
				label={dict?.register?.firstName}
			></Input>
			<Input {...register('lastName')} label={dict?.register?.lastName}></Input>
			<div className='flex w-full gap-2'>
				<div>
					<Select
						{...register('prefix')}
						label={dict?.register?.phonePrefix}
						search
						options={options}
					/>
				</div>
				<Input
					{...register('phone')}
					label={dict?.register?.phone}
					type='phone'
				></Input>
			</div>

			<div className='flex justify-between'>
				<div></div>
				<Button className='mb-3' type='submit'>
					{dict?.common?.next}
				</Button>
			</div>
		</form>
	);
}

export default RegistrationStepOne;
