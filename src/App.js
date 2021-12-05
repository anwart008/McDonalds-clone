import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { MenuStorage } from './components/MenuStorage';
import { Header } from './Header';
import { Cart } from './components/Cart';

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
          <Route exact path="/" element={<MenuStorage/>}/>
          <Route exact path="/Cart" element={<Cart/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
