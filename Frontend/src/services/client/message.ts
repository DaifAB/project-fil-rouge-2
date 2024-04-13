import { config } from '@/config';
import http from '@/utils/http/http';

export const MessageService = {
  async sendMessageContactUs(message: any) {
    return await http<any>({
      url: `${config.marketApiUrl}/messages/contact-us`,
      method: 'POST',
      body: message,
    });
  },
};
