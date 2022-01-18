import { configureStore } from '@reduxjs/toolkit';
// import PomodoroSlice from "./PomodoroSlice";
import pomodoroSlice from './pomodoroSlice';
const store = configureStore({
  reducer: {
    timer: pomodoroSlice,
  },
});

export default store;
