import { config } from '@/config';
import http from '@/utils/http/http';

export const CountryService = {
  async getCountries() {
    const data = await http({
      url: `${config.marketApiUrl}/countries`,
    });
    return data.countries;
  },
};
