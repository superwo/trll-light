import React from 'react';
import Card from '../components/Card';

const Boards = () => {
  return (
    <div className='container' style={{ paddingTop: '40px' }}>
      <Card title='Mini Trello Project' />
      <Card title='2020' />
      <Card title='Home' starred />
      <Card title='A very special project and very long' starred color='red' />
    </div>
  );
};

export default Boards;
