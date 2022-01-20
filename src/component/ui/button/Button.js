import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${classes.button} style = ${props.style} ${props.className}`}
      //   style={`${props.style}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
