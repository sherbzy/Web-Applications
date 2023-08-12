import './App.css';
import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import StoreList from './StoreList';
import NewStore from './NewStore';

function App() {
  return (
      <Routes>
        <Route path="/stores" component={StoreList} />
        <Route path="/stores/new" component={NewStore} />
      </Routes>
  );
}

export default App;
