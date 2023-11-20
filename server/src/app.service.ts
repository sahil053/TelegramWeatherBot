import { Injectable } from '@nestjs/common';
import { Hears, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { MongodbService } from './mongodb/mongodb.service';

@Update()
@Injectable()
export class AppService {
  constructor(private readonly dbService: MongodbService) {}

  getStats(): { message: string } {
    return { message: `Server running on PORT ${process.env.PORT}` };
  }

  @Start()
  async startCommand(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (!user) {
      this.dbService.addOrUpdateUser(update.message.from.id.toString(), update.message.from.first_name, false, false, '');
    } else if (user.blocked) {
      return
    }

    await ctx.replyWithAnimation('https://media.tenor.com/O4xMiXhxANMAAAAd/aintnoway-aint.gif');
    await ctx.reply('Hello! Welcome to NAHHWeather, the worst possible weather bot you could ever stumble upon!');
  }

  @Help()
  async helpCommand(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    await ctx.replyWithHTML('You can use these commands to interact with the bot: \n\n &#x2022; <b>/weather city_name</b> to get current weather stats \n &#x2022; <b>/subscribe city_name</b> to subscribe to daily weather updates \n &#x2022; <b>/unsubscribe</b> to unsubscribe from daily weather updates \n &#x2022; <b>/datetime</b> to get current time \n &#x2022; <b>/photo</b> to get a random aesthetic photo');
  }

  @Hears(/\/weather (.+)/)
  async hearsWeatherCity(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    const weather = await this.dbService.findWeather(update.message.from.first_name, update.message.text.split(" ")[1]);
    await ctx.replyWithPhoto(weather.icon)
    await ctx.reply(weather.message);
  }

  @Hears(/\/subscribe (.+)/)
  async subscribeWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    const city = update.message.text.split(" ")[1];
    await ctx.reply(`Subscribed to daily weather updates for ${city}!`);
    this.dbService.subscribeUser(update.message.from.id.toString(), true, city);
  }

  @Hears('/unsubscribe')
  async unsubscribeWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    await ctx.reply(`Unsubscribed from daily weather updates!`);
    this.dbService.subscribeUser(update.message.from.id.toString(), false);
  }

  @Hears('/subscribe')
  async hearsSubscribe(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    await ctx.reply('Please specify a city name after /subscribe to get specific stats.');
  }

  @Hears('/weather')
  async hearsWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    await ctx.reply('Please specify a city name after /weather to get specific stats.');
  }

  @Hears('/datetime') 
  async hearsDateTime(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    const date = new Date(update.message.date * 1000).toLocaleString('en-US');
    await ctx.reply(`Current date & time: \n\n ${date}`);
  }

  @Hears('/photo')
  async hearsPhoto(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    if (user.blocked) {
      return
    }

    await ctx.replyWithPhoto(`https://source.unsplash.com/random/?night/${Math.random() * 100}`);
  }
}
