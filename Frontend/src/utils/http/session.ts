import { cookies } from 'next/headers';

export const getSessionToken = () => cookies().get('session')?.value;
