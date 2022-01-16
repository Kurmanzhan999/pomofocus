import { configureStore } from "@reduxjs/toolkit";
// import PomodoroSlice from "./PomodoroSlice";
import pomodoroSlice from './PomodoroSlice'
const store = configureStore({
    reducer:{
        timer:pomodoroSlice,
    }
})

export default store;