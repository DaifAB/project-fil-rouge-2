import { Ubuntu, Open_Sans } from 'next/font/google';

export const ubuntu = Ubuntu({
	weight: ['400', '500'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--font-ubuntu',
	display: 'swap',
});

export const openSans = Open_Sans({
	weight: ['400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--font-opensans',
	display: 'swap',
});
