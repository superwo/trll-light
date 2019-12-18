import React from 'react';
import CardList from '../components/CardList';

import './CardPage.css';

const CardPage = () => {
  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: 'limegreen',
        height: '100%'
      }}
      className='card-page'
    >
      <CardList
        title={'Obiective'}
        lists={[
          { name: 'sanatate', id: 0 },
          { name: 'Development', id: 1 },
          { name: 'Sport', id: 2 }
        ]}
      />
    </div>
  );
};

export default CardPage;
