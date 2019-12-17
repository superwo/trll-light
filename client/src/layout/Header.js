import React from 'react';
import Button from '../components/Button';
import { FaHome } from 'react-icons/fa';

function Header() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>
        <FaHome /> <span style={{ marginLeft: '8px' }}>Home</span>
      </Button>
      Header
    </div>
  );
}

export default Header;
