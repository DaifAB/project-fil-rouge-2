import { config } from '@/config';
import http from '@/utils/http/http';
import { Branch } from '@/types/interfaces';

export const KitchenService = {
  async createKitchen(branch: Branch) {
    return await http<Branch>({
      url: `${config.marketApiUrl}/branches`,
      method: 'POST',
      body: branch,
    });
  },

  async updateKitchen(id: string, branch: Branch) {
    return await http<Branch>({
      url: `${config.marketApiUrl}/branches/${id}`,
      method: 'PUT',
      body: branch,
    });
  },

  async getKitchen(id: string) {
    return await http<Branch>({
      url: `${config.marketApiUrl}/branches/${id}`,
    });
  },
};
