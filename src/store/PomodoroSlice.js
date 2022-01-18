import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MODES } from "../Components/utils/constants";

const initialState = {
  currentTime: { name: MODES.POMODORO, time: 25, bodyColor: COLORS.POMODORO }, // pomodoro default
  time:0,
  times: {
    autoStartBreaks: false,
    autoStartPomodoro: false,
    longBreakInterval: 1,
    pomodoroTime: 25,
    shortBreakTime: 1,
    longBreakTime: 15,
  }
};

const pomodoroSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimes(state, action) {
      state.times = action.payload
      if (state.currentTime.name === MODES.POMODORO)
        state.currentTime.time = action.payload.pomodoroTime;
      if (state.currentTime.name === MODES.SHORT_BREAK)
        state.currentTime.time = action.payload.shortBreakTime;
      if (state.currentTime.name === MODES.LONG_BREAK)
        state.currentTime.time = action.payload.longBreakTime;
    },
    setCurrentTime(state, action) {
        state.currentTime = action.payload;
    },
    getProggress(state, action) {
      const result = (100 * action.payload) / (state.currentTime.time * 60);
      state.time = result === 0 ? result : 100 - result;
    },
  },
});

export const { setTimes, setCurrentTime, getProggress, } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
