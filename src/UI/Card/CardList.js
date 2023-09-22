import React from "react";
import card from "./Card.module.css";
import Card from "./Card";

function CardList({ placeList, photoList, onClick, inquiryCounting }) {
  return (
    <ul className={card.list}>
      {placeList &&
        placeList.length > 0 &&
        placeList.map((place, index) => (
          <Card
            place={place}
            key={index}
            onClick={onClick}
            inquiryCounting={inquiryCounting}
          />
        ))}
      {photoList &&
        photoList.length > 0 &&
        photoList.map((photo, index) => (
          <Card
            photo={photo}
            key={index}
            onClick={onClick}
            inquiryCounting={inquiryCounting}
          />
        ))}
    </ul>
  );
}

export default CardList;
