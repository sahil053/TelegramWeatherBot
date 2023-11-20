import { Injectable } from '@nestjs/common';
import { Hears, Help, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { MongodbService } from './mongodb/mongodb.service';

@Update()
@Injectable()
export class AppService {
  constructor(private readonly dbService: MongodbService) {}

  // Check vitals for server
  getStats(): { message: string } {
    return { message: `Server running on PORT ${process.env.PORT}` };
  }

  // Executed whenever a user starts the bot
  @Start()
  async startCommand(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // If new user, create a new entry on DB with req fields
    if (!user) {
      this.dbService.addOrUpdateUser(update.message.from.id.toString(), update.message.from.first_name, false, false, '');
    } else if (user.blocked) {
      // Ignore blocked user
      return
    }

    await ctx.replyWithAnimation('https://media.tenor.com/O4xMiXhxANMAAAAd/aintnoway-aint.gif');
    await ctx.reply('Hello! Welcome to NAHHWeather, the worst possible weather bot you could ever stumble upon!');
  }

  // Executed whenever the user sends the help command for previewing all cmds
  @Help()
  async helpCommand(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    await ctx.replyWithHTML('You can use these commands to interact with the bot: \n\n &#x2022; <b>/weather city_name</b> to get current weather stats \n &#x2022; <b>/subscribe city_name</b> to subscribe to daily weather updates \n &#x2022; <b>/unsubscribe</b> to unsubscribe from daily weather updates \n &#x2022; <b>/datetime</b> to get current time \n &#x2022; <b>/photo</b> to get a random aesthetic photo');
  }

  // Executed whenever the user requests for weather stats of specific city (regex)
  @Hears(/\/weather (.+)/)
  async hearsWeatherCity(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    // Find stats from OpenWeatherMap's API
    const weather = await this.dbService.findWeather(update.message.from.first_name, update.message.text.split(" ")[1]);
    
    await ctx.replyWithPhoto(weather.icon)
    await ctx.reply(weather.message);
  }

  // Executed whenever the user subscribes for daily weather updates on specific city (regex)
  @Hears(/\/subscribe (.+)/)
  async subscribeWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    // Extract city entered by user matched via regex and subscribe user (messy and error-prone, can definitely be improved)
    const city = update.message.text.split(" ")[1];

    await ctx.reply(`Subscribed to daily weather updates for ${city}!`);
    this.dbService.subscribeUser(update.message.from.id.toString(), true, city);
  }

  // Unsubscribe from daily weather updates
  @Hears('/unsubscribe')
  async unsubscribeWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    await ctx.reply(`Unsubscribed from daily weather updates!`);
    this.dbService.subscribeUser(update.message.from.id.toString(), false);
  }

  // Validation handler when user doesn't specify a city/state/country
  @Hears('/subscribe')
  async hearsSubscribe(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    await ctx.reply('Please specify a city name after /subscribe to get specific stats.');
  }

  // Validation handler when user doesn't specify a city/state/country
  @Hears('/weather')
  async hearsWeather(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    await ctx.reply('Please specify a city name after /weather to get specific stats.');
  }

  // Executed whenever someone requests for the their local time/date
  @Hears('/datetime') 
  async hearsDateTime(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    // Convert UNIX time to localized Date/Time
    const date = new Date(update.message.date * 1000).toLocaleString('en-US');
    await ctx.reply(`Current date & time: \n\n ${date}`);
  }

  // Executed whenever someone requests for an aesthetic photo
  @Hears('/photo')
  async hearsPhoto(ctx: Context) {
    const update: any = ctx.update;
    const user = await this.dbService.findUser(update.message.from.id.toString());

    // Ignore blocked user
    if (user.blocked) {
      return
    }

    // Generate random images from unsplash's API
    await ctx.replyWithPhoto(`https://source.unsplash.com/random/?night/${Math.random() * 100}`);
  }
}
