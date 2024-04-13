import { initFirebaseAdminApp } from '@/config/firebase-admin-config';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	await initFirebaseAdminApp();

	//Remove the value and expire the cookie
	const options = {
		name: 'session',
		value: '',
		maxAge: -1,
	};

	cookies().set(options);
	return NextResponse.json({}, { status: 200 });
}
