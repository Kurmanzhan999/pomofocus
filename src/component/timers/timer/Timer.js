import classes from './Timer.module.css';
import stopPng from '../../../assets/icons/stop.png';
import { useSelector } from 'react-redux';
import { setCurrentTime } from '../../../store/pomodoroSlice';
import useTimer from '../../customHook/useTimer';
import CountTimer from '../countTimer/CountTimer';
import { COLORS, MODES } from '../../../utils/constants';
import { useEffect, useState } from 'react';

const Timer = () => {
  const bodyColor = useSelector((state) => state.timer.currentTime.bodyColor);
  const currentTime = useSelector((state) => state.timer.currentTime);
  const {
    pomodoroTime: pomTime,
    shortBreakTime: shortTime,
    longBreakTime: longTime,
  } = useSelector((state) => state.timer.times);
  const { time, startTimer, pauseTimer, isWorking, changeTimer } = useTimer(
    setCurrentTime,
    pomTime,
    shortTime,
    longTime
  );

  const [pomodoroActive, setPomodoroActive] = useState();
  const [longActive, setLongActive] = useState();
  const [shortActive, setShortActive] = useState();
  useEffect(() => {
    if (currentTime.name === MODES.POMODORO) {
      setPomodoroActive('rgba(0, 0, 0, 0.16)');
    } else {
      setPomodoroActive('none');
    }
    if (currentTime.name === MODES.SHORT_BREAK) {
      setShortActive('rgba(0, 0, 0, 0.16)');
    } else {
      setShortActive('none');
    }
    if (currentTime.name === MODES.LONG_BREAK) {
      setLongActive('rgba(0, 0, 0, 0.16)');
    } else {
      setLongActive('none');
    }
  }, [currentTime.name]);

  const pomoFocus = () => {
    changeTimer({
      name: MODES.POMODORO,
      time: pomTime,
      color: COLORS.POMODORO,
    });
  };
  const shortBreak = () => {
    changeTimer({
      name: MODES.SHORT_BREAK,
      time: shortTime,
      color: COLORS.SHORT_BREAK,
    });
  };

  const longBreak = () => {
    changeTimer({
      name: MODES.LONG_BREAK,
      time: longTime,
      color: COLORS.LONG_BREAK,
    });
  };
  const swicherFunction = () => {
    isWorking ? pauseTimer() : startTimer();
  };

  return (
    <div className={classes.middle}>
      <div className={classes.bts}>
        <button
          style={{ background: pomodoroActive }}
          className={classes.button}
          onClick={pomoFocus}
        >
          Pomofocus
        </button>
        <button
          style={{ background: shortActive }}
          className={classes.button}
          onClick={shortBreak}
        >
          {' '}
          Short Break
        </button>
        <button
          style={{ background: longActive }}
          className={classes.button}
          onClick={longBreak}
        >
          Long Break
        </button>
      </div>
      <div className={classes.timer}>
        <CountTimer time={time} />
      </div>
      <div className={classes.startButtons}>
        <button
          className={classes.start}
          style={{ color: bodyColor }}
          onClick={swicherFunction}
        >
          {isWorking ? 'PAUSE' : 'START'}
        </button>
        {isWorking && (
          <img
            className={classes.stopIcon}
            src={stopPng}
            onClick={pomoFocus}
            alt="icon"
          />
        )}
      </div>
    </div>
  );
};
export default Timer;
