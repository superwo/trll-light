import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button
      style={{ fontWeight: props.bold ? 'bold' : 'normal' }}
      className='btn'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
