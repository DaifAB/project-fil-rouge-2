import { config } from '@/config';
import http from '@/utils/http/http';
import { Application } from '@/types/interfaces';

export const ApplicationService = {
  async createApplication(application: Application) {
    return await http<Application>({
      url: `${config.marketApiUrl}/applications`,
      method: 'POST',
      body: application,
    });
  },

  async updateApplication(id: string, application: Partial<Application>) {
    return await http<Application>({
      url: `${config.marketApiUrl}/applications/${id}`,
      method: 'PATCH',
      body: application,
    });
  },

  async getApplications(
    status: string[],
    kitchenId?: string | null,
    brandId?: string | null
  ) {
    const res = await http<any>({
      url: `${config.marketApiUrl}/applications`,
      queryParams: { status, branchId: kitchenId, conceptId: brandId },
    });

    return res.applications;
  },

  async getApplication(id: string) {
    return await http<Application>({
      url: `${config.marketApiUrl}/applications/${id}`,
    });
  },
};
