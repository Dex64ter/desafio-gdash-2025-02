import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  constructor() {}

  @Get()
  getWeather() {
    return {
      message: 'Weather',
    };
  }

  @Post()
  saveWeather(@Body() weatherData: any) {
    return {
      message: 'Create Weather',
    };
  }
}
