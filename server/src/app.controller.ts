import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiService } from './api/api.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly apiService: ApiService) {}

  // GET route for / to check for vitals
  @Get()
  getStats(): { message: string } {
    return this.appService.getStats();
  }

  // GET route for /isValid to check validity of given API
  @Get('/isValid')
  async checkValidity() {
    try {
      const res = await this.apiService.isValidApiKey().toPromise();
      return { status: res.status, message: "API Key is valid!" }
    } catch {
      return { status: 401, message: "API Key isn't valid!" }
    }
  }
}
