/**
 * Contains the routes component along with an app-wide navigation bar and a component to display flashed messages
 */

import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlashedMessages from './FlashedMessages';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar/>
        <FlashedMessages />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
