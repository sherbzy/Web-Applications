import { useState } from "react";

const PokemonCard = ({id, name, image, altText, buttonClick, cardID}) => {
    const cardId = cardID;

    /* use state to update input value */
    const [newName, setNewName] = useState(name);
    const updateNewNameValue = (event) => {
        setNewName(event.target.value);
    }

    /* handle updating the card */
    const handleUpdate = async () => {

        buttonClick(cardId, newName);
    }

    return(
        <div className="pokemonCardDiv">
            <img src={image} alt={altText} />
            <h2>{name}</h2>
            <p>id: {id}</p>

            {/* Input for updating this pokemon cards */}
            <input value={newName} onChange={updateNewNameValue}/>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
}

export default PokemonCard;