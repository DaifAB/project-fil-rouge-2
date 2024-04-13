import { initFirebaseAdminApp } from '@/config/firebase-admin-config';
import { getSessionToken } from '@/utils/http/session';
import { auth } from 'firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	await initFirebaseAdminApp();

	const token = getSessionToken();

	//Validate if the cookie exist in the request
	if (!token) {
		return NextResponse.json({ isLogged: false }, { status: 401 });
	}

	//Use Firebase Admin to validate the session cookie
	const decodedToken = await auth().verifyIdToken(token);

	if (!decodedToken) {
		return NextResponse.json({ isLogged: false }, { status: 401 });
	}

	return NextResponse.json(decodedToken, { status: 200 });
}
