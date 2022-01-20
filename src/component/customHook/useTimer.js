import { useDispatch, useSelector } from 'react-redux';
import startSound from '../../assets/sounds/bell.wav';
import { getProggress } from '../../store/pomodoroSlice';
import { useEffect, useState, useCallback } from 'react';
import { COLORS, MODES } from '../../utils/constants';
import stop from '../../assets/sounds/bell.flac';

let stopSound = new Audio(stop);
let startSounds = new Audio(startSound);

function useTimer(setCurrentTime, pomTime, shortTime) {
  const dispatch = useDispatch();

  const currentTime = useSelector((state) => state.timer.currentTime);
  const { autoStartBreaks, autoStartPomodoro, longBreakInterval } = useSelector(
    (state) => state.timer.times
  );

  const [time, setTime] = useState({ m: currentTime.time, s: 0 });

  //   console.log(currentTime);

  const [timer, setTimer] = useState(null);
  const [isWorking, setIsWorking] = useState(false);

  const pauseTimer = useCallback(() => {
    setIsWorking(false);
    clearInterval(timer);
    stopSound.play();
  }, [timer]);

  const startTimer = useCallback(() => {
    setIsWorking(true);
    startSounds.play();
    let Interval = setInterval(() => {
      setTime((time) => {
        const recent = { ...time };

        if (time.s > 0) recent.s--;
        if (time.s === 0 && time.m > 0) {
          recent.m--;
          recent.s = 59;
        }

        return recent;
      });
    }, 1000);
    setTimer(Interval);
  }, []);

  function changeTimer(data) {
    pauseTimer();
    if (isWorking) {
      if (
        window.confirm(
          'The timer is still running, are you sure you want to switch??'
        )
      ) {
        dispatch(
          setCurrentTime({
            name: data.name,
            time: data.time,
            bodyColor: data.color,
          })
        );
        pauseTimer();
      } else {
        startTimer();
      }
    } else {
      dispatch(
        setCurrentTime({
          name: data.name,
          time: data.time,
          bodyColor: data.color,
        })
      );
    }
  }
  //  function that will clear timeout (autoBreaks, autoPomodoro)
  const onChangeTimers = useCallback(
    (value) => {
      if (value) return;
      if (currentTime.name === MODES.POMODORO) {
        dispatch(
          setCurrentTime({
            name: MODES.SHORT_BREAK,
            time: +shortTime,
            bodyColor: COLORS.SHORT_BREAK,
          })
        );
        autoStartBreaks ? startTimer() : pauseTimer();
      }

      if (currentTime.name === MODES.SHORT_BREAK) {
        dispatch(
          setCurrentTime({
            name: MODES.POMODORO,
            time: +pomTime,
            bodyColor: COLORS.POMODORO,
          })
        );
        autoStartPomodoro ? startTimer() : pauseTimer();
      }
      if (currentTime.name === MODES.LONG_BREAK) {
        dispatch(
          setCurrentTime({
            name: MODES.POMODORO,
            time: +pomTime,
            bodyColor: COLORS.POMODORO,
          })
        );
      }
    },
    [
      autoStartBreaks,
      autoStartPomodoro,
      currentTime.name,
      dispatch,
      pauseTimer,
      pomTime,
      setCurrentTime,
      shortTime,
      startTimer,
    ]
  );

  //  clearTimeout
  useEffect(() => {
    // why setTimeout here? on initial render or when deps change
    // useEffect starts. and it may be that SEVERAL deps may change AT ONCE
    // so I did something like a debounce that will get the most recent run of useEffect
    let miniTimer = setTimeout(() => {
      setCount((prev) => prev - 1);
      if (time.s === 0 && time.m === 0) {
        onChangeTimers(false);
        clearInterval(timer);
      }
    }, 0);
    return () => {
      clearTimeout(miniTimer);
      onChangeTimers(true);
    };
  }, [
    time,
    autoStartBreaks,
    autoStartPomodoro,
    onChangeTimers,
    timer,
    currentTime.time,
  ]);

  const [count, setCount] = useState(currentTime.time * 60);

  // if currentTime.time changes time and count will be updated
  useEffect(() => {
    setTime({ m: currentTime.time, s: 0 });
    setCount(currentTime.time * 60);
  }, [currentTime]);

  //  for percent
  useEffect(() => dispatch(getProggress(count)), [count, dispatch]);

  return {
    setTime,
    time,
    startTimer,
    pauseTimer,
    isWorking,
    changeTimer,
  };
}
export default useTimer;
