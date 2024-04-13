'use client';

import { AlertContext, AuthUserContext } from '@/contexts';
import usePath from '@/hooks/usePath';
import { AuthService } from '@/services/client/auth';
import { Dictionary } from '@/types/interfaces';
import { faPowerOff, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import Cookies from 'js-cookie';

interface Props {
	dict: Dictionary;
}

function Navigation({ dict }: Props) {
	const [authUser] = useContext(AuthUserContext);
	const handleShowAlert = useContext(AlertContext);

	const router = useRouter();

	const path = usePath();
	const [page, urlAccountType] = path.split('/');
	const isSignup = page === 'sign-up';

	const accountType = Cookies.get('accountType') || urlAccountType || 'branch';

	const handleLogout = async () => {
		try {
			await AuthService.signOut();
			router.push('/');
		} catch (error) {
			console.error(error);
			handleShowAlert({
				color: 'danger',
				message: dict.errors?.default,
			});
		}
	};

	return (
		<>
			{authUser === null && (page !== 'sign-up' || accountType === 'brand') && (
				<Link
					href={`/${dict.lang}/sign-up/branch`}
					className='flex items-center gap-2'
				>
					<FontAwesomeIcon icon={faCirclePlus} className='w-4 h-4' />
					<span className='text-[13px] uppercase font-semibold'>
						{dict?.common?.registerYourKitchen}
					</span>
				</Link>
			)}
			{authUser === null &&
				(page !== 'sign-up' || accountType === 'branch') && (
					<Link
						href={`/${dict.lang}/sign-up/brand`}
						className='flex items-center gap-2'
					>
						<FontAwesomeIcon icon={faCirclePlus} className='w-4 h-4' />
						<span className='text-[13px] uppercase font-semibold'>
							{dict?.common?.registerYourBrand}
						</span>
					</Link>
				)}
			{authUser !== undefined &&
				(authUser === null ? (
					<Link
						href={`/${dict.lang}/sign-in`}
						className='flex items-center gap-2'
					>
						<FontAwesomeIcon icon={faUser} className='w-4 h-4' />
						<span className='text-[13px] uppercase font-semibold'>
							{dict?.navbar?.signIn}
						</span>
					</Link>
				) : (
					!authUser.claims.registered &&
					(isSignup ? (
						<Link
							href={`/${dict.lang}/sign-up/${
								accountType === 'branch' ? 'brand' : 'branch'
							}/register`}
							className='flex items-center gap-2'
						>
							<FontAwesomeIcon icon={faUser} className='w-4 h-4' />
							<span className='text-[13px] uppercase font-semibold'>
								{
									dict?.common?.[
										`registerYour${
											accountType === 'branch' ? 'Brand' : 'Kitchen'
										}`
									]
								}
							</span>
						</Link>
					) : (
						<Link
							href={`/${dict.lang}/sign-up/${accountType}/register`}
							className='flex items-center gap-2'
						>
							<FontAwesomeIcon icon={faUser} className='w-4 h-4' />
							<span className='text-[13px] uppercase font-semibold'>
								{dict?.common?.register}
							</span>
						</Link>
					))
				))}
			{/* //! Removed temporarily */}
			{/* {authUser?.claims.registered && page === 'marketplace' && (
				<Link
					href={`/${dict.lang}/marketplace/${otherMode}/home`}
					className='border rounded-full py-1 px-5 text-[13px] uppercase font-semibold'
				>
					Switch to {otherMode} mode
				</Link>
			)} */}
			{authUser?.claims.registered && page !== 'marketplace' && (
				<Link
					href={`/${dict.lang}/marketplace/${accountType}/home`}
					className='flex items-center gap-2'
				>
					<FontAwesomeIcon icon={faStore} className='w-4 h-4' />
					<span className='text-[13px] uppercase font-semibold'>
						Marketplace
					</span>
				</Link>
			)}
			{authUser && (
				<div
					className='flex items-center gap-3 cursor-pointer'
					onClick={handleLogout}
				>
					<FontAwesomeIcon icon={faPowerOff} className='w-4 h-4' />
					<span className='text-[13px] uppercase font-semibold'>
						{authUser.name}
					</span>
				</div>
			)}
		</>
	);
}

export default Navigation;
