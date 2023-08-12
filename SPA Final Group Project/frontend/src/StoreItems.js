import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function StoreItems() {
    // store parameters and variables
    const { store_id } = useParams();
    const [ store, setStore ] = useState([]);

    // list of store items
    const [ items, setItems] = useState([]);

    // fetch from mongodb
    useEffect(() => {
        // first fetch the store items
        fetch(`http://localhost:3001/stores/${store_id}/items/`)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error(error));

        // then fetch the store details
        fetch(`http://localhost:3001/stores/${store_id}`)
            .then((response) => response.json())
            .then((data) => setStore(data))
            .catch((error) => console.error(error));
    }, [store_id]);

    return (
        <>
            <h1>{store.name}</h1>
            <Link to={`/stores/${store_id}/items/new`}>Add new item</Link>
            <h2>List of Items:</h2>
            <ul>
            {items.map((item) => (
                <li key={item._id}><Link to={`/stores/${store_id}/items/${item._id}`}>{item.name}</Link></li>
            ))}
            </ul>
        </>
    );
}