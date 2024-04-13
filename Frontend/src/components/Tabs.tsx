import React from 'react';

interface Props {
	children: React.ReactNode[];
	selectedIndex?: number;
}

function Tabs({ children, selectedIndex = 0 }: Props) {
	return (
		<div className='flex font-mono'>
			{children.map((child, index) => (
				<div
					key={index}
					className='relative flex justify-center items-center px-3 py-2'
				>
					<div>{child}</div>
					{index === selectedIndex && (
						<div className='h-1 w-full bg-primary absolute bottom-0'></div>
					)}
				</div>
			))}
		</div>
	);
}

export default Tabs;
