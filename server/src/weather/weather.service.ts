import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}
  
  private readonly apiKey = process.env.WEATHER_API_KEY;

  // Utilize OpenWeatherMap's Geocoding API to find lat/long of given city/state/country
  findCoordinates(city: string): Observable<AxiosResponse<any>> {
    const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this.apiKey}&units=metric`;

    return this.httpService.get(URL);
  }

  // Utilize OpenWeatherMap's Weather API to find stats of given lat/long
  findWeather(lat: number, long: number): Observable<AxiosResponse<any>> {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}&units=metric`;

    return this.httpService.get(URL);
  }

  // Convert degrees into direction (yeah - I didn't do this LOL)
  degreesToDirection(degrees : number) {
    const direction = degrees >= 337.5 || degrees < 22.5 ? 'N' : degrees >= 22.5 && degrees < 67.5 ? 'NE'
      : degrees >= 67.5 && degrees < 112.5 ? 'E'
      : degrees >= 112.5 && degrees < 157.5 ? 'SE'
      : degrees >= 157.5 && degrees < 202.5 ? 'S'
      : degrees >= 202.5 && degrees < 247.5 ? 'SW'
      : degrees >= 247.5 && degrees < 292.5 ? 'W'
      : 'NW';
  
    return direction;
  }
}
