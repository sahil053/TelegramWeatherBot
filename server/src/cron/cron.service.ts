import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { ApiService } from 'src/api/api.service';

@Injectable()
export class CronService {
  private readonly bot: Telegraf;
  private APIKey: string;

  constructor(private readonly dbService: MongodbService, private readonly apiService: ApiService) {
    this.APIKey = this.apiService.getApiKey();
    this.bot = new Telegraf(this.APIKey);
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async checkValidityApi() {
    try {
      await this.apiService.isValidApiKey().toPromise();
    } catch { 
      this.apiService.setApiKey(process.env.TELEGRAM_BOT_TOKEN)
      console.log("Successfully set default token!");
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendSubAlerts() {
    const users = await this.dbService.findUsers(true);

    for (const user of users) {
      if (user.blocked) {
        continue
      }

      const weather = await this.dbService.findWeather(user.name, user.city);

      await this.bot.telegram.sendPhoto(user.uid, weather.icon);
      await this.bot.telegram.sendMessage(user.uid, weather.message);
    }
  }

}

