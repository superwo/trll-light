import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

import './Menu.css';
import { FaTimes, FaClipboardList, FaTrash } from 'react-icons/fa';

const Menu = ({ board, updateColor, deleteBoard, closeMenu }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [color, setColor] = useState('red');

  const handleColorChange = newColor => {
    setColor(newColor.hex);
    try {
      updateColor(newColor.hex);
    } catch (error) {}
  };

  return (
    <div className='menu'>
      <header>
        <h3>Menu</h3>
        <FaTimes
          style={{ cursor: 'pointer' }}
          onClick={() => closeMenu(false)}
        />
      </header>
      <ul className='menu-list'>
        <li>
          <span className='menu-icon'>
            <FaClipboardList />
          </span>
          <div className='menu-item'>
            <strong>About This Board</strong>
            <span className='menu-description'>
              {board.description
                ? board.description
                : 'Add a description to your board'}
            </span>
          </div>
        </li>
        <li onClick={() => setShowPicker(val => !val)}>
          <span
            style={{ backgroundColor: `${board.color}` }}
            className='c-color'
          ></span>
          <strong className='menu-item'>Change Background</strong>
        </li>
        {showPicker && (
          <li style={{ cursor: 'auto' }}>
            <SketchPicker color={color} onChange={handleColorChange} />
          </li>
        )}
        <li
          style={{
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid #999'
          }}
          onClick={() => deleteBoard(board.id)}
        >
          <span className='menu-icon'>
            <FaTrash />
          </span>
          <strong className='menu-item'>!DELETE BOARD!</strong>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
