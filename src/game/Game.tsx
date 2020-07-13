import React, { useEffect, useState } from 'react'
import { Card } from './card/Card'
import './Game.scss'
import { generateAllCards, ICard } from './set-utils'

export const Game = ({ className }: any) => {
  const [allCards, setAllCards] = useState<ICard[]>([])

  const [currentCards, setCurrentCards] = useState<ICard[]>([])


  useEffect(() => {
    const newCards = generateAllCards()
    setAllCards(newCards)
    setCurrentCards(newCards.splice(0, 9))
  }, [])

  const [selectedArr, setSelectedArr] = useState(new Array(9).fill(false))

  const onSelect = (isSelected: boolean, cardIndex: number) => {
    const updatedArr = [...selectedArr]
    updatedArr[cardIndex] = isSelected
    setSelectedArr(updatedArr)
  }

  return (
    <div className={className}>
      <h1>Game</h1>
      <div className="cards-container">
        {currentCards.map(
          (item, index) => <Card key={index} value={item} isSelected={selectedArr[index]}
                                 onSelect={(newStatus) => onSelect(newStatus, index)}/>)}
      </div>
    </div>
  )
}
