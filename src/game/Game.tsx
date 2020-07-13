import React, { useEffect, useState } from 'react'
import { Card } from './card/Card'
import './Game.scss'
import { checkIfSet, findSet, ICard } from './set-utils'
import { GameUtils } from './game-utils'

const TIMEOUT = 500

export const Game = ({ className }: any) => {
  const [currentCards, setCurrentCards] = useState<ICard[]>([])
  const [selectedArr, setSelectedArr] = useState<number[]>([])

  useEffect(() => {
    GameUtils.startGame()
    setCurrentCards(GameUtils.cardsOnTable)
  }, [])

  useEffect(() => {
    console.log(selectedArr)
    if (selectedArr.length === 3) {
      const selectedCards = selectedArr.map(cardIndex => currentCards[cardIndex])
      const isSet = checkIfSet(selectedCards)

      if (isSet) {
        setTimeout(() => {handleSet()}, TIMEOUT)
      } else {
        setTimeout(() => {setSelectedArr([])}, TIMEOUT)
      }
    }
  }, [selectedArr])

  const onSelect = (isSelected: boolean, cardIndex: number) => {
    const index = selectedArr.indexOf(cardIndex)

    if (index === -1 && isSelected) {
      setSelectedArr([...selectedArr, cardIndex])
    } else {
      const updated = [...selectedArr]
      updated.splice(index, 1)
      setSelectedArr(updated)
    }
  }

  const handleSet = () => {
    GameUtils.removeSelectedCards(selectedArr)
    setSelectedArr([])
    setTimeout(() => {
      GameUtils.drawNewCards()
      setCurrentCards([...GameUtils.cardsOnTable])
    }, TIMEOUT)
  }

  const findSetAutomatically = () => {
    const setCards = findSet(currentCards)
    if (setCards.length) {
      setSelectedArr(setCards)
    }
  }

  return (
    <div className={className}>
      <h1>Game</h1>
      <button onClick={findSetAutomatically}>HELP!</button>
      <div className="cards-container">
        {currentCards.map(
          (item, index) => <Card key={index} value={item} isSelected={selectedArr.indexOf(index)>-1}
                                 onSelect={(newStatus) => onSelect(newStatus, index)}/>)}
      </div>
    </div>
  )
}
