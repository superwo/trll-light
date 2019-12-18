import React from 'react';
import './Button.css';

const Button = ({ bold, children, onClick, type, classes, bgColor }) => {
  return (
    <button
      style={{ fontWeight: bold ? 'bold' : 'normal', backgroundColor: bgColor }}
      className={`btn ${classes ? classes.split(',').join(' ') : ''}`}
      type={type ? type : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
