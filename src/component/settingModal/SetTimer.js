import React, { useState } from 'react';
import Modal from '../ui/modal/Modal';
import styled from 'styled-components';
import classes from './SetTimer.module.css';
import x from '../../assets/icons/x.png';
import Swich from '../ui/swichBall/Swich';
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
        <Header>
          Timmer Setting
          <Img src={x} onClick={closeModal} alt="logo" />
        </Header>
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
        </ul>
        <footer>
          <OK onClick={submitHandler}> OK</OK>
        </footer>
      </div>
    </Modal>
  );
}

const Header = styled.h1`
  font-size: 16px;
  color: rgb(187, 187, 187);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 16px;
  font-size: 20px;
  line-height: 15px;
  color: #bcbcbc;
  order: 0;
  // position: absolute;
  display: flex;
  justify-content: space-around;
  font-family: 'Montserrat', sans-serif;
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
  display: block;
  font-size: 14px;
  color: rgb(187, 187, 187);
  font-weight: bold;
  position: static;
  font-family: 'Montserrat';
  line-height: 15px;
  color: black;
  color: #bcbcbc;
`;

const Li = styled.li`
  color: rgb(85, 85, 85);
  font-weight: bold;
  font-family: 'Montserrat';
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;
const OK = styled.p`
  align-items: center;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 2px;
  color: white;
  opacity: 0.9;
  font-size: 19px;
  padding: 8px 12px;
  min-width: 70px;
  background-color: rgb(34, 34, 34);
  border: 2px solid rgb(34, 34, 34);
  display: inline-block;
`;

const Img = styled.img`
  width: 17px;
  position: absolute;
  top: 20px;
  right: 24px;
  // opacity: 0.1;
  z-index: 2147483647;
  margin-right: 0px;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
`;
