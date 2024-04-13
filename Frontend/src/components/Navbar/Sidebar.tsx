interface Props {
	children: React.ReactNode;
}

function Sidebar({ children }: Props) {
	return (
		<div
			className={`hidden p-5 md:flex flex-col justify-center gap-5 text-gray h-full w-sidebar-width border-r border-r-heavy-gray`}
		>
			{children}
		</div>
	);
}

export default Sidebar;
