import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import Tiles from "./Tiles";

function App() {
  // I've modified the basic CRA to include some material-ui elements
  return (
    <div className="App">
      {/* See src/Header.js */}
      <Header/>
      {/* See src/Tiles.js*/}
      <Tiles/>
    </div>
  );
}

export default App;
