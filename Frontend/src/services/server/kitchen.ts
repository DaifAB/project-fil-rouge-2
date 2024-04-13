import { config } from '@/config';
import { GetKitchenProfileResponse } from '@/types/responses';
import http from '@/utils/http/http';
import { getSessionToken } from '@/utils/http/session';
import { Branch } from '@/types/interfaces';

export const KitchenService = {
  async getKitchen(id: string) {
    return await http<Branch>({
      url: `${config.marketApiUrl}/branches/${id}`,
      token: getSessionToken(),
    });
  },

  async getBrandKitchens(id: string) {
    return await http<Branch[]>({
      url: `${config.marketApiUrl}/concepts/${id}/branches`,
      token: getSessionToken(),
    });
  },
};
