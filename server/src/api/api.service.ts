import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) { }
  
  private APIKEY: string = process.env.TELEGRAM_BOT_TOKEN;

  apiKeyExists(API: string) {
    return API === this.APIKEY ? true : false;
  }

  setApiKey(API: string) {
    this.APIKEY = API;
    console.log("set", this.APIKEY)
  }

  getApiKey() {
    return this.APIKEY;
  }

  isValidApiKey(): Observable<AxiosResponse<any>> {
    const URL = `https://api.telegram.org/bot${this.APIKEY}/getMe`;

    return this.httpService.get(URL);
  }
}
