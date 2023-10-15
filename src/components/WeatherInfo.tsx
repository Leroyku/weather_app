import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import air from '../assets/icons/info/air.png';
import humidity from '../assets/icons/info/humidity.png';
import visibility from '../assets/icons/info/visibility.png';
import pressure from '../assets/icons/info/pressure.png';
import sunrise from '../assets/icons/info/sunrise.png';
import sunset from '../assets/icons/info/sunset.png';

interface WeatherInfo {
  title: string;
  image: string;
  value: string;
}

const WeatherInfo = () => {
  const { weather_right_now, city } = useAppSelector((state) => state.weather);

  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo[]>([]);

  useEffect(() => {
    // Update weatherInfo whenever weather_right_now changes
    setWeatherInfo([
      {
        title: 'Скорость ветра',
        image: air,
        value: `${weather_right_now.air_speed || ''} км/ч`,
      },
      {
        title: 'Влажность',
        image: humidity,
        value: `${weather_right_now.humidity || ''}`,
      },
      {
        title: 'Видимость',
        image: visibility,
        value: `${weather_right_now.visibility || ''} км`,
      },
      {
        title: 'Давление',
        image: pressure,
        value: `${weather_right_now.pressure || ''}`,
      },
      {
        title: 'Восход',
        image: sunrise,
        value: `${weather_right_now.sunrise || ''}`,
      },
      {
        title: 'Закат',
        image: sunset,
        value: `${weather_right_now.sunset || ''}`,
      },
    ]);
  }, [weather_right_now]);

  return (
    <>
      <h2 style={{ fontWeight: '400' }}>Информация о погоде</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {weatherInfo &&
          weatherInfo.map((info, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '280px',
                height: '200px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                margin: '20px 0 0',
                padding: '20px',
              }}>
              <h3 style={{ color: 'gray', marginBottom: '20px' }}>{info.title}</h3>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{}}>{info.value}</h2>
                <img style={{ width: '96px' }} src={info.image} alt="" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WeatherInfo;
