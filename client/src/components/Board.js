import React from 'react';
import { withRouter } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import './Board.css';

const Board = ({ updateBoard, board, styles, history }) => {
  const { name, description, category, color, lists, starred, id } = board;
  return (
    <div style={styles} className='card'>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => history.push(`/${id}`)}
      >
        {name.length > 50 ? name.slice(0, 45) + '...' : name}
      </span>
      <span
        onClick={() =>
          updateBoard({
            name,
            description,
            lists,
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

export default withRouter(Board);
