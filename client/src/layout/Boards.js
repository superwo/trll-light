import React from 'react';
import Card from '../components/Card';

const Boards = ({ title, cards, children }) => {
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
            starred={card.starred}
            color={card.color}
            styles={{ backgroundColor: `${card.color}` }}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Boards;
