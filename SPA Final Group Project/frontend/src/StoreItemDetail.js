import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function StoreItemDetail() {
    // store and item id parameters
    const { store_id, item_id } = useParams();

    // item details
    const [ item, setItem] = useState([]);

    // fetch from mongodb
    useEffect(() => {
        // fetch the item details
        fetch(`http://localhost:3001/stores/${store_id}/items/${item_id}`)
            .then((response) => response.json())
            .then((data) => setItem(data))
            .catch((error) => console.error(error));
    }, [store_id, item_id]);

    return (
        <>
            <h1>{item.name}</h1>
            <h2>Item Details:</h2>
            <p>Price: ${item.price}</p>
            <p>Available: {item.quantity}</p>
        </>
    );
}