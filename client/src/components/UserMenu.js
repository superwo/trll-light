import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaTimes } from 'react-icons/fa';
import './UserMenu.css';
import { UserContext } from '../contexts/userContext';

const UserMenu = () => {
  const [openMenu, isOpenMenu] = useState(false);
  const { logout, name, isLoggedIn } = useContext(UserContext);

  const renderAuthContent = () => {
    return !isLoggedIn ? (
      <React.Fragment>
        <li>
          <Link to='/login'>Log In</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <li>
          <span onClick={logout} style={{ cursor: 'pointer' }}>
            Log Out
          </span>
        </li>
      </React.Fragment>
    );
  };

  return (
    <div className='user-menu' onClick={() => isOpenMenu(op => !op)}>
      <span>{name ? name.slice(0, 2) : <FaRegUser />}</span>
      <ul
        style={{ display: `${openMenu ? 'block' : 'none'}` }}
        className='user-list box'
      >
        <li className='user-name'>{name ? name : 'Please Register'}</li>
        <div className='br'></div>
        {renderAuthContent()}
        <span className='user-close'>
          <FaTimes />
        </span>
      </ul>
    </div>
  );
};

export default UserMenu;
