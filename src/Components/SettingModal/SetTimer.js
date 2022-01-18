import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import styled from 'styled-components';
import classes from './SetTimer.module.css';
import x from '../../assets/icons/x.png';
import Swich from '../UI/SwichBall/Swich';
import { useDispatch, useSelector } from 'react-redux';
import { setTimes } from '../../store/pomodoroSlice';

export default function SetTimer({ closeModal }) {
  const {
    autoStartPomodoro: autoPom,
    autoStartBreaks: autoBreak,
    longBreakInterval,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
  } = useSelector((state) => state.timer.times);
  const dispatch = useDispatch();

  const [autoStartPomodoro, setIsAutoPomodoro] = useState(autoPom);
  const [autoStartBreaks, setIsAutoBreaks] = useState(autoBreak);
  const [longInterval, setLongInterval] = useState(longBreakInterval);

  const [pomTime, setPomTime] = useState(pomodoroTime);
  const [shortTime, setShortTime] = useState(shortBreakTime);
  const [longTime, setLongTime] = useState(longBreakTime);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      setTimes({
        pomodoroTime: pomTime,
        shortBreakTime: shortTime,
        longBreakTime: longTime,
        autoStartPomodoro,
        autoStartBreaks,
        longInterval,
      })
    );
    closeModal();
  }
  const pomoChangeHnadler = (e) => {
    setPomTime(e.target.value);
  };
  const shortTimeChangeHandler = (e) => {
    setShortTime(e.target.value);
  };
  const longTimeChangeHandler = (e) => {
    setLongTime(e.target.value);
  };
  const longIntervalChangeHnadler = (e) => {
    setLongInterval(e.target.value);
  };
  return (
    <Modal>
      <div className={classes.container}>
        <Header>Timmer Setting </Header>
        <Img src={x} onClick={closeModal} alt="logo" />
        <hr />
        <ul>
          <Li>Timer (minutes)</Li>
          <Wrapper>
            <Text>Pomodoro</Text>
            <Text>Short break</Text>
            <Text>Long break</Text>
          </Wrapper>
          <Wrapper>
            <StyledInput
              type="number"
              value={pomTime}
              onChange={pomoChangeHnadler}
            />
            <StyledInput
              type="number"
              value={shortTime}
              onChange={shortTimeChangeHandler}
            />
            <StyledInput
              type="number"
              value={longTime}
              onChange={longTimeChangeHandler}
            />
          </Wrapper>
          <hr />
        </ul>
        <ul>
          <Li>
            Auto start Breaks?
            <Swich onClick={() => setIsAutoBreaks((prev) => !prev)} />
          </Li>{' '}
          <hr />
          <Li>
            Auto start Pomodoros?
            <Swich onClick={() => setIsAutoPomodoro((prev) => !prev)} />
          </Li>{' '}
          <hr />
          <Li>
            Long Break interval
            <StyledInput
              type="number"
              value={longInterval}
              onChange={longIntervalChangeHnadler}
            />
          </Li>
          <OK onClick={submitHandler}> OK</OK>
        </ul>
      </div>
    </Modal>
  );
}

const Header = styled.h1`
  display: inline;
  align-items: center;
  font-size: 30px;
  font-family: 'Montserrat';
  color: #bcbcbc;
  text-align: right;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledInput = styled.input`
  display: block;
  border-radius: 8px;
  width: 70px;
  height: 30px;
  justify-content: space-around;
  align-items: center;
  border: none;
  background-color: white;
  background: #efefef;
`;
const Text = styled.p`
  position: static;
  width: 64px;
  font-family: 'Montserrat';
  font-size: 13px;
  line-height: 15px;
  color: black;
  color: #bcbcbc;
`;

const Li = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`;
const OK = styled.p`
  width: 54px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  font-size: 30px;
  margin-left: 165px;
  border-radius: 4px;
`;

const Img = styled.img`
  display: inline;
  size: 320px;
  text-align: right;
  margin-left: 70px;
`;
