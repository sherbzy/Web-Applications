// NewStore.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const NewItem = () => {
    // store parameters and variables
    const { store_id } = useParams();
    
    // variable to hold the store's name
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    // form submission handling
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(store_id);
        console.log(JSON.stringify({
            "name": itemName,
            "price": itemPrice,
            "quantity": itemQuantity
        }));

        // add store to the database
        fetch(`http://localhost:3001/stores/${store_id}/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name": itemName,
                "quantity": itemQuantity,
                "price": itemPrice
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("New item successfully created!", data);
            })
            .catch((error) => console.error(error));

        // reset the form
        setItemName('');
        setItemPrice('');
        setItemQuantity('');
    }

    // return a form for creating a new store - name and id
    return (
        <>
            <div>
                <h1>New Item Form</h1>
                <form onSubmit={ handleSubmit }>
                    <label>Item Name: </label>
                    <input type="text" id="itemName" value={itemName}
                        onChange={(e) => setItemName(e.target.value)}/>
                    <br />
                    <label>Price: </label>
                    <input type="number" min="0" step="0.01" id="itemPrice" value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}/>
                    <br />
                    <label>Quantity: </label>
                    <input type="number" min="0" step="1" id="itemQuantity" value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)} />
                    <br />
                    <button type="submit">Submit New Item</button>
                </form>
            </div>
        </>
    )

}

export default NewItem;