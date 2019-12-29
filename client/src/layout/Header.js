import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import { FaHome, FaChalkboard, FaPlus, FaInfo } from 'react-icons/fa';
import './Header.css';
import logo from '../resources/logo_transparent.png';
import UserMenu from '../components/UserMenu';

function Header({ history }) {
  const redirectToHome = () => {
    history.push('/');
  };
  return (
    <header className='header'>
      <nav className='navigation'>
        <Button onClick={redirectToHome}>
          <FaHome />
        </Button>
        <Button bold>
          <FaChalkboard /> <span style={{ marginLeft: '8px' }}>Boards</span>
        </Button>
      </nav>
      <div className='logo' onClick={() => history.push('/')}>
        <img src={logo} alt='logo' />
      </div>
      <ul className='header-utils'>
        <li>
          <Button>
            <FaPlus />
          </Button>
        </li>
        <li>
          <Button>
            <FaInfo />
          </Button>
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </header>
  );
}

export default withRouter(Header);
