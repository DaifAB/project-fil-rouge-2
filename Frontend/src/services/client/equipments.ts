import { config } from '@/config';
import http from '@/utils/http/http';

export const EquipmentService = {
  async getEquipment() {
    const data = await http({
      url: `${config.marketApiUrl}/equipments`,
    });
    return data.equipments;
  },
};
