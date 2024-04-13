import { auth } from '@/config/firebase-config';

export const getIdToken = () => {
  return new Promise<string | undefined>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then(resolve).catch(reject);
        unsubscribe();
      } else {
        resolve(undefined);
      }
    });
  });
};
