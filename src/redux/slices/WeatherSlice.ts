import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import sun from '../../assets/icons/weather/sun.svg';
import cloudy from '../../assets/icons/weather/cloudy.svg';
import partly_cloudy from '../../assets/icons/weather/partly_cloudy.svg';
import rainy from '../../assets/icons/weather/rainy.svg';
import rainy_cloud from '../../assets/icons/weather/rainy_cloud.svg';
import storm from '../../assets/icons/weather/storm.svg';
import snowy from '../../assets/icons/weather/snowy.svg';

const getWeatherImage = (condition: string) => {
  if (condition.includes('Солн') || condition === 'Ясно') return sun;
  if (condition === 'Облачно') return cloudy;
  if (condition === 'Переменная облачность') return partly_cloudy;
  if (condition.includes('дождь')) return rainy;
  if (condition.includes('Пасмурно')) return rainy_cloud;
  if (condition.includes('гром')) return storm;
  if (condition.includes('снег')) return snowy;

  return '';
};

type WNow = {
  img: string;
  temp: number;
  date: string;
  status: string;
  chance_of_rain: number;
  air_speed: number;
  humidity: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
};

type WDay = {
  img: string;
  temp: number;
};

type WWeek = {
  img: string;
  temp: number;
};

interface IWeather {
  city: string;
  weather_right_now: WNow;
  weather_all_day: WDay[];
  weather_three_days: WWeek[];
}

const initialState: IWeather = {
  city: '',
  weather_right_now: {
    img: '',
    temp: 0,
    date: '',
    status: '',
    chance_of_rain: 0,
    air_speed: 0,
    humidity: 0,
    visibility: 0,
    pressure: 0,
    sunrise: '',
    sunset: '',
  },
  weather_all_day: [],
  weather_three_days: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<any>) => {
      if (action.payload.location) {
        state.city = action.payload.location.name;
      }
      const currentWeather = action.payload.current;
      const forecastWeather = action.payload.forecast;

      if (currentWeather && forecastWeather) {
        const current = currentWeather;
        const forecastday = forecastWeather.forecastday[0];
        const hours: number[] = forecastWeather.forecastday[0].hour;
        const threeDays = forecastWeather.forecastday;

        const filteredHours = hours.filter((hour: number, index: number) => index % 6 === 0);
        const transformedHourlyForecast = filteredHours.map((item: any) => ({
          img: getWeatherImage(item.condition.text),
          temp: item.temp_c,
        }));

        state.weather_right_now = {
          img: getWeatherImage(current.condition.text),
          temp: current.temp_c,
          date: current.last_updated,
          status: current.condition.text,
          chance_of_rain: forecastday.day.daily_chance_of_rain,
          air_speed: current.wind_kph,
          humidity: current.humidity,
          visibility: current.vis_km,
          pressure: current.pressure_mb,
          sunrise: forecastday.astro.sunrise,
          sunset: forecastday.astro.sunset,
        };

        state.weather_all_day = transformedHourlyForecast;
        state.weather_three_days = threeDays.map((item: any) => ({
          img: getWeatherImage(item.day.condition.text),
          temp: item.day.avgtemp_c,
        }));
      }
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
