import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wrapper from './Wrapper';
import Stores from './Stores';
import NewStore from './NewStore';
import StoreItems from './StoreItems';
import StoreItemDetail from './StoreItemDetail';
import NewItem from './NewItem';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper/>,
      children: [
        { /* lists all stores */
          path: "/stores",
          element: <Stores />,
        },
        { /* displays a form to create a store that accepts the name of the store */
          path: "/stores/new",
          element: <NewStore />,
        },
        { /* displays all items for that specific store */
          path: "stores/:store_id",
          element: <StoreItems />
        },
        { /* */
          path: "stores/:store_id/items/:item_id",
          element: <StoreItemDetail />
        },
        { /* displays a form to create a new item*/
          path: "/stores/:store_id/items/new",
          element: <NewItem />,
        },
      ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallBackElement={<div>Loading...</div>}/>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
