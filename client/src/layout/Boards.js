import React from 'react';
import Card from '../components/Card';

const Boards = ({ title, updateBoard, cards, children }) => {
  if (cards.length === 0) {
    return '';
  }
  return (
    <React.Fragment>
      <h2>
        {children}
        <span>{title}</span>
      </h2>
      <div className='boards-container'>
        {cards.map(card => (
          <Card
            key={card.id}
            title={card.name}
            description={card.description}
            category={card.category}
            starred={card.starred}
            color={card.color}
            id={card.id}
            updateCard={updateBoard}
            styles={{ backgroundColor: `${card.color}` }}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Boards;
