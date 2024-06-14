import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {createCard, readDeck} from "../utils/api";
import "./CreateCard.css"
import React from "react";

function CreateCard() {
    const {deckId} = useParams();

    const initialCardData = {front: '', back: ''}
    const navigate = useNavigate();
    const [deckInfo, setDeckInfo] = useState({});
    const [card, setCard] = useState(initialCardData);
    const abortController = new AbortController();

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchDeck() {
            try {
                const res = await readDeck(deckId, abortController.signal);
                setDeckInfo(res);
            } catch (error) {
                console.error('Error fetching deck info:', error);
            }
        }

        if (deckId) {
            fetchDeck();
        } else {
            console.error('deckId is not defined');
        }

        return () => {
            abortController.abort();
        };
    }, [deckId]);

    const saveHandle = (event) => {
        if (card.back !== '' && card.front !== '') {
            createCard(deckId, card, abortController.signal)
                .then((res) => console.log(res))

            setCard({...initialCardData});
        }
    }

    const doneHandle = (event) => {
        navigate(`/decks/${deckId}`);
    }

    const changeHandle = (event) => {
        const {name, value} = event.target;
        setCard((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }



    return (
        <form className={"create-card"}>
            <h2>{deckInfo.name}: Add Card</h2>
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
                <button type="cancel" className={"cancel btn"} onClick={doneHandle}>Done</button>
                <button type="submit" className={"submit btn"} onClick={saveHandle}>Save</button>
            </div>
        </form>
    )
}

export default CreateCard;