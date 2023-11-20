import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) { }
  
  private APIKEY: string = process.env.TELEGRAM_BOT_TOKEN;

  // Check if given API Key is same as previous one
  apiKeyExists(API: string) {
    return API === this.APIKEY ? true : false;
  }

  // Set the new API Key
  setApiKey(API: string) {
    this.APIKEY = API;
    console.log("Set new key: ", this.APIKEY)
  }

  // Get the current API Key
  getApiKey() {
    return this.APIKEY;
  }

  // Check if given API Key is valid/functional
  isValidApiKey(): Observable<AxiosResponse<any>> {
    const URL = `https://api.telegram.org/bot${this.APIKEY}/getMe`;

    return this.httpService.get(URL);
  }
}
