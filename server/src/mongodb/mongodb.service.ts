import { Injectable, Inject } from '@nestjs/common';
import { Collection } from 'mongodb';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class MongodbService {
  constructor( @Inject('DATABASE_CONNECTION') private readonly collection: Collection, private readonly weatherService: WeatherService ) {}

  async addOrUpdateUser(UID: string, name: string, sub: boolean, blocked: boolean, city: string) {
    await this.collection.replaceOne(
      { uid: UID },
      { uid: UID, name: name, city: city, subscribed: sub, blocked: blocked },
      { upsert: true }
    );
  }

  async findUsers(sub?: boolean) {
    return sub ? await this.collection.find({ subscribed: true }).toArray() : await this.collection.find({}).toArray();
  }

  async findUser(UID: string) {
    return await this.collection.findOne({ uid: UID });
  }

  async subscribeUser(UID: string, sub: boolean, city?: string) {
    await this.collection.updateOne(
      { uid: UID },
      { $set: { subscribed: sub, city: city } }
    );
  }

  async blockUser(UID: string, blocked: boolean) {
    await this.collection.updateOne(
      { uid: UID },
      { $set: { blocked: blocked } }
    );
  }

  async deleteUser(UID: string) {
    await this.collection.deleteOne({ uid: UID });
  }

  async findWeather(name: string, city: string) {
    const location = await this.weatherService.findCoordinates(city).toPromise();
    const loc = location.data[0];
    const weather = await this.weatherService.findWeather(loc.lat, loc.lon).toPromise();
    const weath = weather.data;
    const direction = this.weatherService.degreesToDirection(weath.wind.deg);

    return {
      message: `Hey ${name}! Here are today's weather stats for ${[loc.name, loc.state, loc.country].join(', ')}: \n\n Current Temperature: ${weath.main.temp} °C \n Feels like: ${weath.main.feels_like} °C \n Weather: ${weath.weather[0].main} \n Humidity: ${weath.main.humidity} \n Wind speed: ${[weath.wind.speed, direction].join(" m/s ")}`,
      icon: `https://openweathermap.org/img/wn/${weath.weather[0].icon}@2x.png`
    }
  }

}