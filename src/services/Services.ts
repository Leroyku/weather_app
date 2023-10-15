import axios from 'axios';

interface UserLocation {
  latitude: number;
  longitude: number;
}

class Services {
  private userLocation: UserLocation | null;

  constructor() {
    this.userLocation = null;
  }

  private getCityName(latitude: number, longitude: number): Promise<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=ru`;

    return axios
      .get(apiUrl)
      .then((response) => {
        const cityName = response.data?.address?.city;
        if (cityName) {
          return cityName;
        } else {
          throw new Error('City not found for the given coordinates.');
        }
      })
      .catch((error) => {
        throw new Error('Error fetching city name: ' + error.message);
      });
  }

  private getWeatherData(apiKey: string, cityName: string): Promise<any> {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=no&lang=ru`;

    return axios
      .get(apiUrl)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error('Error fetching weather data: ' + error.message);
      });
  }

  public getUserLocation(apiKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.userLocation = { latitude, longitude };
            this.getCityName(latitude, longitude)
              .then((cityName) => this.getWeatherData(apiKey, cityName))
              .then((weatherData) => resolve(weatherData))
              .catch((error) => reject('Error fetching weather data: ' + error.message));
          },
          (error) => {
            console.error('Error getting user location: ' + error.message);
            console.log('Using default location (Moscow)...');
            this.getWeatherData(apiKey, 'Москва')
              .then((weatherData) => resolve(weatherData))
              .catch((error) => reject('Error fetching weather data: ' + error.message));
          },
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        console.log('Using default location (Moscow)...');
        this.getWeatherData(apiKey, 'Москва')
          .then((weatherData) => resolve(weatherData))
          .catch((error) => reject('Error fetching weather data: ' + error.message));
      }
    });
  }
}

export default Services;
