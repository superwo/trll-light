import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const CardListItem = ({ name, deleteItem, updateItem }) => {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const changeNameHandler = e => {
    e.preventDefault();
    updateItem(newName);
    setEditMode(false);
  };

  return (
    <li>
      {editMode ? (
        <form onSubmit={changeNameHandler}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className='input-s'
            autoFocus
          />
        </form>
      ) : (
        <React.Fragment>
          <span>{newName}</span>
          <span>
            <FaTrash onClick={deleteItem} style={{ marginRight: '5px' }} />
            <FaPencilAlt
              onClick={() => {
                setEditMode(true);
              }}
            />
          </span>
        </React.Fragment>
      )}
    </li>
  );
};

export default CardListItem;
