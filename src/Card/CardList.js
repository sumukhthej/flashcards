import CardItem from "./CardItem";
import "./CardList.css"
import React from "react";

function CardList({cards}) {

    if(!cards || cards.length < 0) {
        return null;
    }
    const cardList = cards.map((card) => (<CardItem card={card}/>))

    return (cardList)?
        (
        <section className={"card-list"}>
            <h2>Cards</h2>
            {cardList}
        </section>
    ):
        <></>
}

export default CardList;