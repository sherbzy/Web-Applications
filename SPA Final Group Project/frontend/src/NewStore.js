// NewStore.js
import React, { useState } from 'react';

const NewStore = () => {
    // variable to hold the store's name
    const [storeName, setStoreName] = useState('');

    // form submission handling
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(storeName);

        // add store to the database
        fetch(`http://localhost:3001/stores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name": storeName
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("New store successfully created!", data);
            })
            .catch((error) => console.error(error));

        // reset the form
        setStoreName('');
    }

    // return a form for creating a new store - name and id
    return (
        <>
            <div>
                <h1>New Store Form</h1>
                <form onSubmit={ handleSubmit }>
                    <label>Store Name: </label>
                    <input type="text" id="storeName" value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}/>
                    <br />
                    <button type="submit">Submit New Store</button>
                </form>
            </div>
        </>
    )

}

export default NewStore;