import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import './Card.css';

const Card = ({
  updateCard,
  title,
  description,
  category,
  color,
  starred,
  styles,
  history,
  id
}) => {
  return (
    <div style={styles} className='card'>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => history.push(`/card/${id}`)}
      >
        {title.length > 50 ? title.slice(0, 45) + '...' : title}
      </span>
      <span
        onClick={() =>
          updateCard({
            name: title,
            description,
            category,
            starred: !starred,
            color,
            id
          })
        }
        className={`card-star ${starred ? 'starred' : ''}`}
      >
        <FaStar />
      </span>
    </div>
  );
};

export default withRouter(Card);
