import React from 'react'
import './App.css'
import { Game } from './game/Game'
import { generateAllCards } from './game/set-utils'

function App() {

  return (
    <div className="App">
    <Game className="game"/>
    </div>
  );
}

export default App;
