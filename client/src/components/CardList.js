import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import './CardList.css';

const CardList = ({ title, lists, id, addListCard }) => {
  const [addCard, setAddCard] = useState(false);
  const [cardName, setCardName] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    if (cardName) {
      addListCard(id, cardName);
      setAddCard(false);
      setCardName('');
    }
  };

  return (
    <div className='card-list'>
      <h4 className='card-list-title'>{title}</h4>
      <ul>
        {lists.map((name, ind) => {
          return <li key={ind}>{name}</li>;
        })}
      </ul>
      <footer>
        {addCard ? (
          <form onSubmit={submitHandler}>
            <input
              onBlur={() => setAddCard(false)}
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              type='text'
              className='input-s'
              autoFocus
            />
          </form>
        ) : (
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => setAddCard(true)}
          >
            <FaPlus /> <span>Add another card</span>
          </div>
        )}
      </footer>
    </div>
  );
};

export default CardList;
