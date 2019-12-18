import React from 'react';
import Card from '../components/Card';
import { FaRegStar, FaRegClock } from 'react-icons/fa';

import './Boards.css';

const Boards = () => {
  return (
    <div className='container' style={{ paddingTop: '40px' }}>
      <ul className='boards-category'>
        <li>
          <h2>
            <FaRegStar />
            <span>Starred Boards</span>
          </h2>
          <div className='boards-container'>
            <Card title='Home' starred />
            <Card
              title='A very special project and very long'
              starred
              color='red'
            />
          </div>
        </li>
        <li>
          <h2>
            <FaRegClock />
            <span>Recently Viewed</span>
          </h2>
          <div className='boards-container'>
            <Card title='Mini Trello Project' />
            <Card title='2020' styles={{ backgroundColor: 'green' }} />
            <Card title='2019' />
            <Card title='2018' styles={{ backgroundColor: 'red' }} />
            <Card title='2017' />
            <Card title='Home' starred />
            <Card
              title='A very special project and very long very long very long very long very long very long very long very long very long very long'
              starred
              color='red'
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Boards;
