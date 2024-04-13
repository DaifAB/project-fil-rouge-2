'use client';

import NotFound from '@/components/PageNotFound';
import useLang from '@/hooks/useLang';
import { dictionaries } from '@/i18n';

export default function PageNotFound() {
	const lang = useLang();
	const dict = dictionaries[lang];

	return <NotFound dict={dict} />;
}
