import {Link} from "react-router-dom";
import DeleteIcon from "../Component/DeleteIcon";
import EditIcon from "../Component/EditIcon";
import "./CardItem.css"
import {deleteCard} from "../utils/api";
import React from "react";

function CardItem({card}) {

    const deleteHandle = (event) => {
        const confirmDelete = window.confirm('Delete the card? \n\nYou will not be able to recover it.')
        if (confirmDelete) {
            const abortController = new AbortController();
            deleteCard(card.id, abortController.signal)
                .then(console.log)
                .catch(console.error)
            window.location.reload();
        }
    }

    return (
        <article className="card-item" key={card.id}>
            <div className={`item-${card.id}`} id={"card-content"}>
                <div className={"card-front"}>
                    <p className={"card-name"}>{card.front}</p>
                </div>
                <div className={"card-back"}>
                    <p className={"card-name"}>{card.back}</p>
                </div>
            </div>
            <div className={"deck-action"}>
                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className={"edit btn"}><EditIcon /> Edit</Link>
                <button className={"delete btn"} onClick={deleteHandle}><DeleteIcon /></button>
            </div>
        </article>
    )
}

export default CardItem;