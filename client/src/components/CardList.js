import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import './CardList.css';
import CardListItem from './CardListItem';

const CardList = ({ title, lists, id, addListCard, updateList }) => {
  const [displayLists, setDisplayLists] = useState([]);
  const [addCard, setAddCard] = useState(false);
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    setDisplayLists(lists);
  }, [lists]);

  const addCardHandler = e => {
    e.preventDefault();
    if (cardName) {
      addListCard(id, cardName);
      setAddCard(false);
      setCardName('');
    }
  };

  const deleteListHandler = () => {
    try {
      updateList(id);
    } catch (error) {}
  };

  const deleteListItemHandler = async index => {
    const newList = displayLists.filter((item, ind) => ind !== index);
    try {
      await updateList(id, newList);
      setDisplayLists(newList);
    } catch (error) {}
  };

  const updateListItemHandler = async (nameId, newName) => {
    const updatedList = displayLists.map((item, ind) => {
      if (ind === nameId) {
        return newName;
      } else {
        return item;
      }
    });
    try {
      await updateList(id, updatedList);
      setDisplayLists(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='card-list'>
      <header>
        <h4 className='card-list-title'>{title}</h4>
        <FaTrash onClick={deleteListHandler} />
      </header>
      <ul>
        {displayLists.map((name, ind) => {
          return (
            <CardListItem
              key={ind}
              name={name}
              id={ind}
              deleteItem={() => deleteListItemHandler(ind)}
              updateItem={newName => updateListItemHandler(ind, newName)}
            />
          );
        })}
      </ul>
      <footer>
        {addCard ? (
          <form onSubmit={addCardHandler}>
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
