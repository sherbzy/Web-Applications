import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Stores() {
    // list of stores
    const [ stores, setStores] = useState([]);

    // fetch the stores from mongodb
    useEffect(() => {
        fetch(`http://localhost:3001/stores`)
            .then((response) => response.json())
            .then((data) => setStores(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            <h1>List of Stores:</h1>
            <ul>
            {stores.map((store) => (
                <li key={store._id}><Link to={`${store._id}`}>{store.name}</Link></li>
            ))}
            </ul>
        </>
    );
}