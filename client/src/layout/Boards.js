import React from 'react';
import Board from '../components/Board';

const Boards = ({ title, updateBoard, boards, children }) => {
  if (boards.length === 0) {
    return '';
  }
  return (
    <React.Fragment>
      <h2>
        {children}
        <span>{title}</span>
      </h2>
      <div className='boards-container'>
        {boards.map(board => (
          <Board
            key={board.id}
            board={board}
            updateBoard={updateBoard}
            styles={{ backgroundColor: `${board.color}` }}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Boards;
