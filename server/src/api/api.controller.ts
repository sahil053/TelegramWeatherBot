import { Controller, Post, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) { }
  
  @Post('/addApiKey/:id')
  addApiKey(@Param('id') apiKey: string) {
    const api = this.apiService.apiKeyExists(apiKey);
    
    if (!api) {
      this.apiService.setApiKey(apiKey);
      return { message: "Successfully added new API Key to backend!" };
    } else {
      return { message: "API Key already in database!" }
    }
  }
}
