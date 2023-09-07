import React from "react";
import card from "./Card.module.css";
import Card from "./Card";

function CardList({ placeList, onClick, inquiryCounting }) {
  return (
    <ul className={card.list}>
      {placeList.map((place, index) => {
        return (
          <Card
            place={place}
            key={index}
            onClick={onClick}
            inquiryCounting={inquiryCounting}
          />
        );
      })}
    </ul>
  );
}

export default CardList;
