import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: 'Coluna Reta Api is running! 🚀',
      docs: baseUrl + '/api',
    };
  }
  
}
