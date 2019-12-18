import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import './Card.css';

const Card = ({ title, starred, styles, history, id = '1' }) => {
  return (
    <div
      onClick={() => history.push(`/card/${id}`)}
      style={styles}
      className='card'
    >
      {title.length > 50 ? title.slice(0, 45) + '...' : title}
      <span className={`card-star ${starred ? 'starred' : ''}`}>
        <FaStar />
      </span>
    </div>
  );
};

export default withRouter(Card);
