import { nameRegex } from '@/config/regex';
import useForm from '@/hooks/useForm';
import Button from '../Button';
import Input from '../form/Input';
import { Dictionary } from '@/types/interfaces';

interface Props {
	dict: Dictionary;
	onSubmit: any;
	handleBack: any;
	loading: boolean;
}

function RegistrationStepTwo({ dict, onSubmit, handleBack, loading }: Props) {
	const { register, handleSubmit } = useForm(
		{
			accountName: {
				init: '',
				required: {
					value: true,
				},
				pattern: {
					value: nameRegex,
				},
			},
		},
		{
			dict,
			onSubmit,
		}
	);

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<Input
				{...register('accountName')}
				label={dict?.register?.accountName}
			></Input>
			<div className='flex justify-between'>
				<Button
					className='mb-3 bg-heavy-gray'
					onClick={handleBack}
					disabled={loading}
				>
					{dict?.common?.previous}
				</Button>
				<Button
					className='mb-3'
					type='submit'
					loading={loading}
					disabled={loading}
				>
					{dict?.common?.submit}
				</Button>
			</div>
		</form>
	);
}

export default RegistrationStepTwo;
