import React from 'react';
import { FaPlus } from 'react-icons/fa';

import './CardList.css';

const CardList = ({ title, lists }) => {
  return (
    <div className='card-list'>
      <h4 className='card-list-title'>{title}</h4>
      <ul>
        {lists.map(({ name, id }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
      <footer>
        <FaPlus /> <span>Add another card</span>
      </footer>
    </div>
  );
};

export default CardList;
