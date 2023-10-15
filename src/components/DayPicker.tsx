import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import sun from '../assets/icons/weather/sun.svg';
import cloudy from '../assets/icons/weather/cloudy.svg';
import partly_cloudy from '../assets/icons/weather/partly_cloudy.svg';
import rainy from '../assets/icons/weather/rainy.svg';
import rainy_cloud from '../assets/icons/weather/rainy_cloud.svg';
import storm from '../assets/icons/weather/storm.svg';
import snowy from '../assets/icons/weather/snowy.svg';

interface DayPickerProps {}
interface WeatherInfo {
  title: string;
  image: string;
  value: string;
}

const DayPicker: React.FC<DayPickerProps> = () => {
  const { weather_all_day, weather_three_days } = useAppSelector((state) => state.weather);
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const initialOption = (urlParams.get('current') as 'today' | 'week') || 'today';

  const [selectedOption, setSelectedOption] = useState<'today' | 'week'>(initialOption);
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState<WeatherInfo[]>([]);

  const [weatherInfo, setWeatherInfo] = useState<{
    day: WeatherInfo[];
    week: WeatherInfo[];
  }>({
    day: [],
    week: [],
  });

  useEffect(() => {
    if (selectedOption === 'today') setCurrentWeatherInfo(weatherInfo.day);
    if (selectedOption === 'week') setCurrentWeatherInfo(weatherInfo.week);
  }, [selectedOption, weatherInfo]);

  useEffect(() => {
    if (weather_all_day.length > 0 && weather_three_days.length > 0) {
      setWeatherInfo({
        day: [
          { title: 'Утро', image: weather_all_day[0].img, value: `${weather_all_day[0].temp}°` },
          { title: 'День', image: weather_all_day[1].img, value: `${weather_all_day[1].temp}°` },
          { title: 'Вечер', image: weather_all_day[2].img, value: `${weather_all_day[2].temp}°` },
          { title: 'Ночь', image: weather_all_day[3].img, value: `${weather_all_day[3].temp}°` },
        ],
        week: [
          {
            title: 'Сегодня',
            image: weather_three_days[0].img,
            value: `${weather_three_days[0].temp}°`,
          },
          {
            title: 'Завтра',
            image: weather_three_days[1].img,
            value: `${weather_three_days[1].temp}°`,
          },
          {
            title: 'Послезавтра',
            image: weather_three_days[2].img,
            value: `${weather_three_days[2].temp}°`,
          },
        ],
      });
    }
  }, [weather_all_day]);

  const handleOptionClick = (option: 'today' | 'week') => {
    setSelectedOption(option);

    urlParams.set('current', option);
    navigate(`?${urlParams.toString()}`);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            margin: '0 10px 20px 0',
            paddingBottom: '4px',
            fontSize: '25px',
            color: selectedOption === 'today' ? 'black' : 'gray',
            borderBottom: selectedOption === 'today' ? '1px solid black' : 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleOptionClick('today')}>
          Сегодня
        </div>
        <div
          style={{
            margin: '0 20px 20px 10px',
            paddingBottom: '4px',
            fontSize: '25px',
            color: selectedOption === 'week' ? 'black' : 'gray',
            borderBottom: selectedOption === 'week' ? '1px solid black' : 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleOptionClick('week')}>
          Неделя
        </div>
      </div>
      <div style={{ display: 'flex', margin: '30px 0 45px' }}>
        {currentWeatherInfo &&
          currentWeatherInfo.map((info, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                marginRight: '10px',
              }}>
              <p>{info.title}</p>
              <img src={info.image} alt="" />
              <p>{info.value}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default DayPicker;
