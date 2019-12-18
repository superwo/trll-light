import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import './UserMenu.css';

const UserMenu = ({ name }) => {
  const [openMenu, isOpenMenu] = useState(false);
  return (
    <div className='user-menu' onClick={() => isOpenMenu(op => !op)}>
      <span>{name ? name : <FaRegUser />}</span>
      <ul
        style={{ display: `${openMenu ? 'block' : 'none'}` }}
        className='user-list box'
      >
        <li className='user-name'>Avad Radu</li>
        <div className='br'></div>
        <li>
          <Link to='/login'>Log In</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <span className='user-close'>
          <FaTimes />
        </span>
      </ul>
    </div>
  );
};

export default UserMenu;
