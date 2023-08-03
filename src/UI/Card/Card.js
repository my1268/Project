import React from 'react';
import card from './Card.module.css';

function Card({ place }) {
  return (
    <li className={card.item} key={place.name}>
      <div className={card.image}>
        <img src={place.image} alt={place.name} />
      </div>
      <span className={card.date}>{place.date}</span>
      <h4 className={card.name}>{place.name}</h4>
      <address className={card.address}>{place.address}</address>
    </li>
  );
}

export default Card;
