'use client';

import { Dictionary } from '@/types/interfaces';
import NeedHelp from './NeedHelp';
import Popup from './Popup';
import Button from './Button';
import usePopup from '@/hooks/usePopup';

interface Props {
	dict: Dictionary;
}

function NeedHelpPopup({ dict }: Props) {
	const [open, handleToggle] = usePopup();

	return (
		<>
			<Button className='bg-primary' onClick={handleToggle}>
				{dict.marketplace?.brands?.profile?.questionsReachOutToUs}
			</Button>
			<Popup
				title={dict.marketplace?.home?.needHelp}
				showCloseButton
				open={open}
				onClose={handleToggle}
			>
				<NeedHelp dict={dict} />
			</Popup>
		</>
	);
}

export default NeedHelpPopup;
