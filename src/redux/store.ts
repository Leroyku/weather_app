import { configureStore } from '@reduxjs/toolkit';
import weather from './slices/WeatherSlice';

export const store = configureStore({
  reducer: {
    weather,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
