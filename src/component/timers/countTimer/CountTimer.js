import React from 'react';
import classes from '../countTimer/CountTimer.module.css';

const CountTimer = (props) => {
  const { s, m } = props.time;

  const timerMinutes = m < 10 ? `0${m}` : m;
  const timerSeconds = s < 10 ? `0${s}` : s;

  return (
    <div className={classes.time}>
      <div className={classes.timer}>
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default CountTimer;
