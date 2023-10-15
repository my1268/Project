import React from "react";
import card from "./Card.module.css";

function Card({ placeList, onClick, uiWrite }) {
  return (
    <ul className={card.list}>
      {placeList.map((place) => (
        <li className={card.item} key={place.title}>
          <div className={card.image}>
            <img
              src={place.image}
              alt={place.title}
              onClick={() => onClick(place.id)}
            />
          </div>
          {uiWrite ? (
            <>
              <h4 className={card.title}>{place.title}</h4>
              <div className={card.nickname}>작성자: {place.nickname}</div>
            </>
          ) : null}
          <div className={card.date}>{place.date}</div>
          <address className={card.address}>{place.address}</address>
        </li>
      ))}
    </ul>
  );
}

export default Card;
