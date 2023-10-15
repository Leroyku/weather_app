import React from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';

const WeatherRightNow = () => {
  const { weather_right_now, city } = useAppSelector((state) => state.weather);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        style={{ width: '260px' }}
        src={weather_right_now.img && weather_right_now.img}
        alt="weather img"
      />
      <h1 style={{ fontWeight: '400', fontSize: '72px', display: 'flex', justifyContent: 'start' }}>
        {weather_right_now.temp && weather_right_now.temp}
        <span
          style={{
            fontSize: '38px',
            height: '76px',
            display: 'flex',
            alignItems: 'center',
          }}>
          ℃
        </span>
      </h1>
      <h3
        style={{
          fontWeight: '600',
          marginTop: '30px',
          marginBottom: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid #eee',
        }}>
        {weather_right_now.date && weather_right_now.date}
      </h3>
      <h4
        style={{
          fontWeight: '600',
        }}>
        {weather_right_now.status && weather_right_now.status}
      </h4>
      <h4
        style={{
          fontWeight: '600',
        }}>
        Шанс дождя - {weather_right_now.chance_of_rain && weather_right_now.chance_of_rain}%
      </h4>
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
          height: '60px',
          fontSize: '24px',
          fontWeight: '600',
          borderRadius: '15px',
        }}>
        {city && city}
      </div>
    </div>
  );
};

export default WeatherRightNow;
