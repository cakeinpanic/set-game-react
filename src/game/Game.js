import React from 'react'
import { Card } from './card/Card'
import './Game.css'
import { generateAllCards } from './set-utils'

export const Game = ({ className }) => {
  const allCards = generateAllCards()
  const currentCards = allCards.splice(0,9)

  return (
    <div className={className}>
      <h1>Game</h1>
      <div className="cards-container">
      {currentCards.map((item,index) => <Card key={index} value={item}/>)}
      </div>
    </div>
  )
}
