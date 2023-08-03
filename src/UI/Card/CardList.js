import React from 'react';
import card from './Card.module.css';
import Card from './Card';

function CardList({ placeList }) {
  return (
    <ul className={card.list}>
      {placeList.map((place) => {
        return <Card place={place} />;
      })}
    </ul>
  );
}

export default CardList;
