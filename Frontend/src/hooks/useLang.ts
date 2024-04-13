import { usePathname } from 'next/navigation';

function useLang() {
	const pathname = usePathname();
	const lang = pathname.split('/')[1];
	return lang;
}

export default useLang;
