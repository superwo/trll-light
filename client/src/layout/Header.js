import React from 'react';
import Button from '../components/Button';
import { FaHome, FaChalkboard, FaPlus, FaInfo } from 'react-icons/fa';
import './Header.css';
import logo from '../resources/logo_transparent.png';

function Header() {
  return (
    <header className='header'>
      <nav className='navigation'>
        <Button>
          <FaHome />
        </Button>
        <Button bold>
          <FaChalkboard /> <span style={{ marginLeft: '8px' }}>Boards</span>
        </Button>
      </nav>
      <div className='logo'>
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
          <div className='log-info'>Ra</div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
