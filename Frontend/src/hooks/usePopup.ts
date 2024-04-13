'use client';

import { useState } from 'react';

function usePopup(init = false) {
	const [open, setOpen] = useState(init);

	const handleToggle = () => {
		setOpen((open) => !open);
	};

	return [open, handleToggle] as const;
}

export default usePopup;
