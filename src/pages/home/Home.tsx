import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import Services from '../../services/Services';

import WeatherRightNow from '../../components/WeatherRightNow';
import DayPicker from '../../components/DayPicker';
import WeatherInfo from '../../components/WeatherInfo';

import styles from './Home.module.scss';

import { setWeather } from '../../redux/slices/WeatherSlice';

const Home = () => {
  const services = new Services();
  const dispatch = useAppDispatch();

  useEffect(() => {
    services
      .getUserLocation('18d4b5501c014ddeb2d81732232109')
      .then((res) => {
        dispatch(setWeather(res));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles._left}>
        <WeatherRightNow />
      </div>
      <div className={styles._right}>
        <DayPicker />
        <WeatherInfo />
      </div>
    </div>
  );
};

export default Home;
