import { config } from '@/config';
import { auth } from '@/config/firebase-config';
import http from '@/utils/http/http';
import { Account, User } from '@/types/interfaces';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';

export const AuthService = {
  async refreshToken(forceRefresh = false) {
    await auth.currentUser?.getIdToken(forceRefresh);
    await http({ url: `${config.baseUrl}/api/login` });
  },

  async getConnectedUser(token?: string) {
    const user = await http<User & { accounts: Account[] }>({
      url: `${config.marketApiUrl}/users/connected`,
      token,
    });

    return user;
  },

  async setUserClaims(uid: string, accountType: 'branch' | 'brand') {
    await http({
      url: `${config.marketApiUrl}/users/claims`,
      method: 'PATCH',
      body: {
        uid,
        accountType,
      },
    });
  },

  async signIn(email: string, password: string) {
    const credentials = await signInWithEmailAndPassword(auth, email, password);

    await http({
      url: `${config.baseUrl}/api/login`,
    });

    return credentials;
  },

  async signUp(email: string, password: string) {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await http({
      url: `${config.baseUrl}/api/login`,
    });

    return credentials;
  },

  async signOut() {
    Cookies.remove('accountType');
    await http({
      url: `${config.baseUrl}/api/logout`,
    });
    await signOut(auth);
  },

  async register(data: any) {
    await http({
      url: `${config.marketApiUrl}/users/register`,
      method: 'POST',
      body: data,
    });
  },

  async updateEmail(email: string) {
    return await http({
      url: `${config.marketApiUrl}/users/email`,
      method: 'PATCH',
      body: {
        uid: auth.currentUser!.uid,
        email,
      },
    });
  },
};
