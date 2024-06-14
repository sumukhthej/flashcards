import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {readCard, updateCard} from "../utils/api";
import "./CreateCard.css"


function EditCard() {
    const {deckId, cardId} = useParams();

    const navigate = useNavigate();
    const [card, setCard] = useState({});
    const abortController = new AbortController();

    useEffect(() => {
        const abortController = new AbortController();
        readCard(cardId, abortController.signal)
            .then((res) => {
                setCard(res);
                document.getElementById('card-front').value = res.front;
                document.getElementById('card-back').value = res.back;
            })
            .catch(() => navigate("/"));
    }, []);

    const changeHandle = (event) => {
        const {name, value} = event.target;
        setCard((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }

    const submitHandle = (event) => {
        if (card.back !== '' && card.front !== '') {
            event.preventDefault();
            if (card) {
                updateCard(card, abortController.signal)
                    .then((res) => console.log(res))
                setTimeout(() => (navigate(`/decks/${deckId}`)), 100);
            }
        }
    }

    const cancelHandle = () => {
        navigate(`/decks/${deckId}`);
    }

    return (
        <form className={"create-card"}>
            <h2>Edit Card</h2>
            <label htmlFor={"card-front"}>
                Front:
                <textarea
                    id={"card-front"}
                    name={"front"}
                    placeholder={"Front side of the card"}
                    onChange={changeHandle}
                    required
                />
            </label>
            <br/>
            <label>
                Back:
                <textarea
                    id={"card-back"}
                    name={"back"}
                    placeholder={"Back side of the card"}
                    onChange={changeHandle}
                    required
                />
            </label>
            <div>
                <button type="cancel" className={"cancel btn"} onClick={cancelHandle}>Cancel</button>
                <button type="submit" className={"submit btn"} onClick={submitHandle}>Submit</button>
            </div>
        </form>
    )
}

export default EditCard;