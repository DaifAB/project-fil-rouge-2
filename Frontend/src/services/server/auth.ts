import { getSessionToken } from '@/utils/http/session';
import { AuthService as ClientAuthService } from '../client/auth';

export const AuthService = {
	async getConnectedUser() {
		return ClientAuthService.getConnectedUser(getSessionToken());
	},
};
