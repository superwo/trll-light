import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardList from '../components/CardList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import Button from '../components/Button';
import { FaRegStar } from 'react-icons/fa';

import { UserContext } from '../contexts/userContext';
import { useHttpClient } from '../hooks/useHttp';
import { BOARDS_SERVER } from '../services/misc';

import './CardPage.css';

const CardPage = () => {
  const [board, setBoard] = useState(false);
  const [editName, setEditName] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const { token } = useContext(UserContext);
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await sendRequest(`${BOARDS_SERVER}/${id}`, 'GET', null, {
          Authorization: 'Bearer ' + token
        });
        setBoard(data.board);
        setBoardName(data.board.name);
        setIsStarred(data.board.starred);
      } catch (err) {}
    };
    fetchBoard();
  }, []);

  useEffect(() => {
    updateBoardHandler();
  }, [isStarred]);

  const updateBoardHandler = async e => {
    e && e.preventDefault();
    if (boardName.length > 5) {
      const newBoard = {
        ...board,
        name: boardName ? boardName : board.name,
        starred: isStarred
      };
      try {
        const data = await sendRequest(
          `${BOARDS_SERVER}/${id}`,
          'PATCH',
          JSON.stringify(newBoard),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        );
        setBoard(data.board);
      } catch (err) {}
    }
    setEditName(false);
  };

  if (isLoading) {
    return <LoadingSpinner asOverlay />;
  }

  if (!isLoading && !!error) {
    return <ErrorModal error={error} onClear={clearError} />;
  }

  return board ? (
    <div
      style={{
        padding: '10px',
        backgroundColor: `${board.color}`,
        height: '100%'
      }}
      className='card-page'
    >
      <header className='cardpage-header'>
        <div className='cardpage-header__left'>
          <div className='card-page__title'>
            {editName ? (
              <form onSubmit={updateBoardHandler}>
                <input
                  style={{
                    padding: '3px 10px',
                    borderRadius: '3px',
                    fontSize: '18px',
                    outline: 'none',
                    border: 'none',
                    width: '100%'
                  }}
                  autoFocus
                  value={boardName}
                  onChange={e => setBoardName(e.target.value)}
                  onBlur={updateBoardHandler}
                />
              </form>
            ) : (
              <span onClick={() => setEditName(true)}>{board.name}</span>
            )}
          </div>
          <Button
            onClick={e => {
              setIsStarred(val => !val);
            }}
          >
            <span className={isStarred ? 'accent-icon' : ''}>
              <FaRegStar />
            </span>
          </Button>
          <Button onClick={() => console.log(board.category)}>
            {board.category}
          </Button>
        </div>
        <div className='cardpage-header__right'>
          <Button>... Show Menu</Button>
        </div>
      </header>
      <CardList
        title='To Do'
        lists={[
          { name: 'sanatate', id: 0 },
          { name: 'Development', id: 1 },
          { name: 'Sport', id: 2 }
        ]}
      />
    </div>
  ) : (
    ''
  );
};

export default CardPage;
