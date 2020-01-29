import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import CardList from '../components/CardList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';
import Menu from '../components/Menu';
import Button from '../components/Button';
import { FaRegStar, FaPlus, FaTimes } from 'react-icons/fa';

import { UserContext } from '../contexts/userContext';
import { useHttpClient } from '../hooks/useHttp';
import { BOARDS_SERVER } from '../services/misc';

import './CardPage.css';

const CardPage = () => {
  const [board, setBoard] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [boardCategory, setBoardCategory] = useState('');
  const [isStarred, setIsStarred] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [editName, setEditName] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [addList, setAddList] = useState(false);

  const [listName, setListName] = useState('');

  const { token } = useContext(UserContext);
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const {
    error: asError,
    sendRequest: sendAsReq,
    clearError: clearAsError
  } = useHttpClient();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await sendRequest(`${BOARDS_SERVER}/${id}`, 'GET', null, {
          Authorization: 'Bearer ' + token
        });
        console.log(data.board);
        setBoard(data.board);
        setBoardName(data.board.name);
        setBoardCategory(data.board.category);
        setIsStarred(data.board.starred);
      } catch (err) {}
    };
    fetchBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateBoardHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarred]);

  const updateBoardHandler = async e => {
    e && e.preventDefault();
    if (boardName.length > 1 && boardCategory.length > 1) {
      const newBoard = {
        ...board,
        name: boardName ? boardName : board.name,
        category: boardCategory ? boardCategory : board.category,
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
    setEditCategory(false);
  };

  const updateAsBoardHandler = async color => {
    if (color) {
      const newBoard = {
        ...board,
        color
      };
      try {
        const data = await sendAsReq(
          `${BOARDS_SERVER}/${id}`,
          'PATCH',
          JSON.stringify(newBoard),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        );
        if (!asError) {
          setBoard(data.board);
        }
        clearAsError();
      } catch (err) {}
    }
    setEditName(false);
    setEditCategory(false);
  };
  const updateAsListItemsHandler = async (listId, items) => {
    let lists = [];
    if (items) {
      lists = board.lists.map(list => {
        if (list.id === listId) {
          return { ...list, items };
        } else {
          return { ...list };
        }
      });
    } else {
      lists = board.lists.filter(list => list.id !== listId);
    }
    const newBoard = {
      ...board,
      lists: lists
    };
    try {
      const data = await sendAsReq(
        `${BOARDS_SERVER}/${id}`,
        'PATCH',
        JSON.stringify(newBoard),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      );
      if (!asError) {
        setBoard(data.board);
      }
      clearAsError();
    } catch (err) {}

    setEditName(false);
    setEditCategory(false);
  };

  const addBoardList = async () => {
    if (listName) {
      try {
        const newBoard = {
          ...board,
          lists: [...board.lists, { name: listName, id: uuid(), items: [] }]
        };
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

      setListName('');
      setAddList(false);
    }
  };

  const addListCard = async (listId, val) => {
    try {
      const newBoard = {
        ...board,
        lists: board.lists.map(list => {
          if (list.id === listId) {
            const items = [...list.items];
            items.push(val);
            return { ...list, items };
          } else {
            return { ...list };
          }
        })
      };
      const data = await sendAsReq(
        `${BOARDS_SERVER}/${id}`,
        'PATCH',
        JSON.stringify(newBoard),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      );
      if (!asError) {
        setBoard(data.board);
      }
    } catch (err) {
      console.log(err);
    }
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
        backgroundColor: `${board.color}`
      }}
      className='card-page'
    >
      <header className='cardpage-header'>
        <div className='cardpage-header__left'>
          <div className='card-page__title'>
            {editName ? (
              <form onSubmit={updateBoardHandler}>
                <input
                  className='input-s'
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
          {editCategory ? (
            <form onSubmit={updateBoardHandler}>
              <input
                className='input-s'
                autoFocus
                value={boardCategory}
                onChange={e => setBoardCategory(e.target.value)}
                onBlur={updateBoardHandler}
              />
            </form>
          ) : (
            <Button onClick={() => setEditCategory(true)}>
              {board.category}
            </Button>
          )}
        </div>
        <div className='cardpage-header__right'>
          <Button onClick={() => setShowMenu(true)}>... Show Menu</Button>
        </div>
      </header>
      <main className='lists-container'>
        {board.lists.length > 0 &&
          board.lists.map(list => (
            <CardList
              addListCard={addListCard}
              key={list.id}
              id={list.id}
              title={list.name}
              lists={list.items}
              updateList={updateAsListItemsHandler}
            />
          ))}
        {addList ? (
          <div
            className='empty-list'
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              cursor: 'auto',
              backgroundColor: '#ebecf0'
            }}
          >
            <form
              onSubmit={e => {
                e.preventDefault();
                addBoardList();
              }}
            >
              <input
                className='input-s'
                style={{ marginBottom: '5px' }}
                autoFocus
                value={listName}
                onChange={e => setListName(e.target.value)}
              />
            </form>
            <div
              onBlur={() => setAddList(false)}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Button onClick={addBoardList} classes='btn-green'>
                Add List
              </Button>
              <FaTimes
                onClick={() => setAddList(false)}
                style={{
                  fontSize: '18px',
                  fill: '#2f415f',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        ) : (
          <div className='empty-list' onClick={() => setAddList(true)}>
            <FaPlus />{' '}
            <span style={{ marginLeft: '10px' }}>Add another list</span>
          </div>
        )}
      </main>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames='menu'
        unmountOnExit
      >
        <Menu
          closeMenu={setShowMenu}
          board={board}
          updateColor={updateAsBoardHandler}
        />
      </CSSTransition>
    </div>
  ) : (
    ''
  );
};

export default CardPage;
