import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import { LayoutProps } from '@/types/interfaces';

function Layout({ params: { accountType }, children }: LayoutProps) {
	return (
		<TransitionPageWrapper className='flex w-full h-full'>
			<div
				className='w-full lg:w-1/2 flex justify-center px-5 py-10 overflow-auto'
				style={{
					alignItems: 'safe center',
				}}
			>
				{children}
			</div>
			<div
				className='w-1/2 hidden lg:block md:block bg-cover bg-center'
				style={{
					backgroundImage: `url(/assets/images/signup-page/${
						accountType || 'brand'
					}_bg.png)`,
				}}
			>
				<div className='w-full h-full flex  justify-center items-center backdrop-brightness-75'></div>
			</div>
		</TransitionPageWrapper>
	);
}

export default Layout;
