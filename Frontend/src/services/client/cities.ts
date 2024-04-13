import { config } from '@/config';
import http from '@/utils/http/http';

export const CityService = {
  async getCities(country: string) {
    const data = await http({
      url: `${config.marketApiUrl}/cities?country=${country}`,
    });
    return data.cities;
  },
};
