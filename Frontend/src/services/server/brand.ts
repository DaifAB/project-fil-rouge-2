import { config } from '@/config';
import { Concept } from '@/types/interfaces';
import { GetAvailableBrandsResponse } from '@/types/responses';
import http from '@/utils/http/http';
import { getSessionToken } from '@/utils/http/session';

export const BrandService = {
  async getAvailableBrands(kitchenId: string) {
    return await http<GetAvailableBrandsResponse[]>({
      url: `${config.marketApiUrl}/branches/${kitchenId}/concepts/available`,
      token: getSessionToken(),
    });
  },

  async getBrand(id: string) {
    return await http<Concept>({
      url: `${config.marketApiUrl}/concepts/${id}`,
      token: getSessionToken(),
    });
  },
};
