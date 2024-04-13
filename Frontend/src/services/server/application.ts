import { config } from '@/config';
import http from '@/utils/http/http';
import { getSessionToken } from '@/utils/http/session';
import { Application } from '@/types/interfaces';

export const ApplicationService = {
  async getApplication(id: string, accountId?: string) {
    return await http<Application>({
      url: `${config.marketApiUrl}/applications/${id}`,
      queryParams: { account: accountId },
      token: getSessionToken(),
    });
  },

  async getApplications(
    kitchenId: string | null,
    status: string[],
    accountId: string
  ) {
    const res = await http<any>({
      url: `${config.marketApiUrl}/applications`,
      queryParams: { account: accountId, status, branchId: kitchenId },
      token: getSessionToken(),
    });

    return res.applications;
  },
};
