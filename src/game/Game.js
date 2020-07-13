import React from 'react'
import { Card } from './card/Card'
import './Game.css'

export const Game = ({ className }) => {
  let cards = [0, 1,2,3,4,5,6,7,8]

  return (
    <div className={className}>
      <h1>Game</h1>
      <div className="cards-container">
      {cards.map((item,index) => <Card key={index} value={item}/>)}
      </div>
    </div>
  )
}
