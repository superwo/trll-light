import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { FaRegStar, FaRegClock } from 'react-icons/fa';
import { BOARDS_SERVER } from '../services/misc';
import { UserContext } from '../contexts/userContext';
import { useHttpClient } from '../hooks/useHttp';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';

import './Boards.css';
import Boards from './Boards';

const BoardsContainer = () => {
  const [boards, setBoards] = useState([]);
  const { token } = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest(BOARDS_SERVER, 'GET', null, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      });
      console.log(data);
      setBoards(data.boards);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  if (!!error && !isLoading) {
    return <ErrorModal error={error} onClear={clearError} />;
  }

  return (
    <div className='container' style={{ paddingTop: '40px' }}>
      <ul className='boards-category'>
        <li>
          <Boards
            title='Starred Boards'
            cards={[
              { id: 0, name: 'Home', starred: true, color: 'green' },
              {
                id: 1,
                name:
                  'A very special project and very long very long very long very long very long very long very long very long very long very long',
                starred: false,
                color: 'green'
              }
            ]}
          >
            <FaRegStar />
          </Boards>
        </li>
        <li>
          {boards.length > 0 && (
            <Boards
              title='Recently Viewed'
              cards={boards.map(card => ({ ...card }))}
            >
              <FaRegClock />
            </Boards>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BoardsContainer;
