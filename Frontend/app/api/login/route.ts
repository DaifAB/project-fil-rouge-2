import { initFirebaseAdminApp } from '@/config/firebase-admin-config';
import { auth } from 'firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	await initFirebaseAdminApp();

	const authorization = headers().get('Authorization');
	if (authorization?.startsWith('Bearer ')) {
		const idToken = authorization.split('Bearer ')[1];
		const decodedToken = await auth().verifyIdToken(idToken);

		if (decodedToken) {
			//Generate session cookie
			const expiresIn = 60 * 60 * 24 * 5 * 1000;
			const options = {
				name: 'session',
				value: idToken,
				maxAge: expiresIn,
				httpOnly: true,
				secure: true,
			};

			//Add the cookie to the browser
			cookies().set(options);
		}
	}

	return NextResponse.json({}, { status: 200 });
}
