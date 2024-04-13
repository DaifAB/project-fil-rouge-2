import { config } from '@/config';
import http from '@/utils/http/http';
import { Concept } from '@/types/interfaces';

export const ConceptService = {
  async createBrand(concept: Concept) {
    return await http<Concept>({
      url: `${config.marketApiUrl}/concepts`,
      method: 'POST',
      body: concept,
    });
  },

  async updateBrand(id: string, concept: Concept) {
    return await http<Concept>({
      url: `${config.marketApiUrl}/concepts/${id}`,
      method: 'PUT',
      body: concept,
    });
  },

  async getBrand(id: string) {
    return await http<Concept>({
      url: `${config.marketApiUrl}/concepts/${id}`,
    });
  },
};
