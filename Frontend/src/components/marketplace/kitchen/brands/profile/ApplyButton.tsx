'use client';

import Button from '@/components/Button';
import { AlertContext } from '@/contexts';
import { ApplicationService } from '@/services/client/application';
import { Dictionary } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

interface Props {
	dict: Dictionary;
	brandId: string;
	accountId: string;
}

function ApplyButton({ dict, brandId, accountId }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const handleShowAlert = useContext(AlertContext);

	const handleApply = async () => {
		try {
			setLoading(true);

			const application = await ApplicationService.createApplication({
				account: accountId,
				branchApplication: {
					concept: brandId,
				},
				status: 'draft',
				type: 'kitchen',
				proposals: [],
			});

			router.push(
				`/${dict.lang}/marketplace/branch/brands/application/${application._id}/step-1`
			);
		} catch (error) {
			console.error(error);
			handleShowAlert({
				color: 'danger',
				message: dict.errors?.default,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button loading={loading} onClick={handleApply}>
			{dict.marketplace?.brands?.profile?.applyNow}
		</Button>
	);
}

export default ApplyButton;
