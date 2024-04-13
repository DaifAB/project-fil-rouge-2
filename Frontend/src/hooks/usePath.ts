import { usePathname } from 'next/navigation';

function usePath() {
	const pathname = usePathname();
	const pathNameWithoutLocal = pathname.split('/').slice(2).join('/');
	return pathNameWithoutLocal;
}

export default usePath;
