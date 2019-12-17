import React from 'react';
import { FaStar } from 'react-icons/fa';

import './Card.css';

const Card = ({ title, starred }) => {
  return (
    <div className='card'>
      {title}
      <span className={`card-star ${starred ? 'starred' : ''}`}>
        <FaStar />
      </span>
    </div>
  );
};

export default Card;
