import React from 'react';
import './App.css';
import NavBar from './NavBar';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <NavBar/>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
