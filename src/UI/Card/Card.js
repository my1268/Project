import React from "react";
import card from "./Card.module.css";

function Card({ place, onClick }) {
  return (
    <li className={card.item} key={place.name}>
      <div className={card.image}>
        <img src={place.image} alt={place.name} onClick={onClick} />
      </div>
      <h4 className={card.inquiry}>{place.inquiry}</h4>
      <h4 className={card.name}>{place.name}</h4>
      <span className={card.nickName}>{place.nickName}</span>
      <span className={card.date}>{place.date}</span>
      <address className={card.address}>{place.address}</address>
    </li>
  );
}

export default Card;
