import React from "react";
import card from "./Card.module.css";

function CardList({ placeList, onClick }) {
  return (
    <ul className={card.list}>
      {placeList.map((place) => (
        <li className={card.item} key={place.id}>
          <div className={card.image}>
            <img
              src={place.image}
              alt={place.title}
              onClick={() => onClick(place.id)}
            />
          </div>
          <h4 className={card.title}>{place.title}</h4>
          <div className={card.nickname}>작성자: {place.nickname}</div>
          <div className={card.date}>{place.date}</div>
          <address className={card.address}>{place.address}</address>
        </li>
      ))}
    </ul>
  );
}

export default CardList;
