import classes from './Timer.module.css';
import Button from '../../UI/Button/Button';
import stopPng from '../../../assets/icons/stop.png';
import { useSelector } from 'react-redux';
import { setCurrentTime } from '../../../store/pomodoroSlice';
import useTimer from '../../CustomHook/useTimer';
import CountTimer from '../CountTimer/CountTimer';
import { COLORS, MODES } from '../../../utils/constants';
// import { ReactComponent as Stop } from '../../../assets/icons/stop.png';

const Timer = () => {
  const bodyColor = useSelector((state) => state.timer.currentTime.bodyColor);
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

  const swicherFunction = () => {
    isWorking ? pauseTimer() : startTimer();
  };

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

  return (
    <div className={classes.middle}>
      <div className={classes.bts}>
        <Button className={classes.button} onClick={pomoFocus}>
          Pomofocus
        </Button>
        <Button className={classes.button} onClick={shortBreak}>
          {' '}
          Short Break
        </Button>
        <Button className={classes.button} onClick={longBreak}>
          Long Break
        </Button>
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
            alt=""
          />
        )}
        {/* <Stop /> */}
      </div>
    </div>
  );
};
export default Timer;
