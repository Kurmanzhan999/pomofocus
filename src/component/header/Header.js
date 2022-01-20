import Vector from '../../assets/icons/Vector.png';
import Report from '../../assets/icons/Report.png';
import classes from './Header.module.css';
import Button from '../ui/button/Button';
import { useState } from 'react';
import SetTimer from '../settingModal/SetTimer';
import { useSelector } from 'react-redux';

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const openMModalHandler = () => {
    setOpenModal((prevState) => !prevState);
  };
  const lineWidth = useSelector((state) => state.timer.progress);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.title}>Pomofocus</div>
          <div className={classes.button}>
            <Button onClick={openMModalHandler}>
              <img className={classes.logo} src={Report} alt="logo" /> Report
            </Button>
            <Button onClick={openMModalHandler}>
              <img className={classes.logo} src={Vector} alt="logo" /> Settings
            </Button>
            {openModal && <SetTimer closeModal={openMModalHandler} />}
          </div>
        </div>
        <div className={classes.line}>
          <div
            className={classes.lineDone}
            style={{ width: `${lineWidth}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Header;
