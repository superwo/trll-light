import React, { useState, useEffect, useContext } from 'react';
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
  }, [token, sendRequest]);

  const updateBoard = async newBoard => {
    await sendRequest(
      `${BOARDS_SERVER}/${newBoard.id}`,
      'PATCH',
      JSON.stringify(newBoard),
      {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    );
    setBoards(
      boards.map(board => (board.id === newBoard.id ? newBoard : { ...board }))
    );
  };

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
            updateBoard={updateBoard}
            title='Starred Boards'
            boards={boards
              .filter(card => card.starred)
              .map(card => ({ ...card }))}
          >
            <FaRegStar />
          </Boards>
        </li>
        <li>
          {boards.length > 0 && (
            <Boards
              updateBoard={updateBoard}
              title='Recently Viewed'
              boards={boards.map(card => ({ ...card }))}
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
