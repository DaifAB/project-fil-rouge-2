import { cert, getApps, initializeApp } from 'firebase-admin/app';

export const devConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
};

// Initialize Firebase
export async function initFirebaseAdminApp() {
  const credential = cert(devConfig);

  if (getApps().length <= 0) {
    initializeApp({ credential });
  }
}
