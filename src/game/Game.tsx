import React, { useEffect, useState } from 'react'
import { Card } from '../card/Card'
import './Game.scss'
import { checkIfSet, ICard } from '../utils/set-utils'
import { GameUtils, SET_SIZE } from '../utils/game-utils'
import { RulesPopup } from './RulesPopup'

const TIMEOUT = 500

export const Game = () => {
  const [currentCards, setCurrentCards] = useState<ICard[]>([])
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  useEffect(() => {restartGame()}, [])

  useEffect(() => {

    const handleSet = () => {
      GameUtils.removeSelectedCards(selectedCardIndexes)
      setSelectedCardIndexes([])

      setTimeout(() => {
        GameUtils.drawMoreCards()
        setCurrentCards([...GameUtils.cardsOnTable])
      }, TIMEOUT)
    }


    if (selectedCardIndexes.length === SET_SIZE) {
      const selectedCards = selectedCardIndexes.map(cardIndex => currentCards[cardIndex])
      const isSet = checkIfSet(selectedCards)

      if (isSet) {
        setTimeout(() => {handleSet()}, TIMEOUT)
      } else {
        setTimeout(() => {setSelectedCardIndexes([])}, TIMEOUT)
      }
    }
  }, [selectedCardIndexes, currentCards])

  useEffect(() => {
    setGameOver(GameUtils.nextSet.length === 0)
  }, [currentCards])

  const onCardSelect = (isSelected: boolean, cardIndex: number) => {
    if (selectedCardIndexes.indexOf(cardIndex) === -1 && isSelected) {
      setSelectedCardIndexes([...selectedCardIndexes, cardIndex])
      return
    }
    setSelectedCardIndexes(selectedCardIndexes.filter(index => index !== cardIndex))

  }

  const highlightSetAutomatically = () => {
    const setCards = GameUtils.nextSet
    if (setCards.length) {
      setSelectedCardIndexes(setCards)
    }
  }

  const restartGame = () => {
    GameUtils.startGame()
    setCurrentCards(GameUtils.cardsOnTable)
  }

  const renderBoard = () => {
    return currentCards.map((item, index) =>
      <Card key={index}
            card={item}
            isSelected={selectedCardIndexes.indexOf(index) > -1}
            onSelect={(newStatus) => onCardSelect(newStatus, index)}/>)
  }

  return (
    <div className="game">
      <div className="header">
        <h1>Set game</h1>
        <div className="btn-container">
          <div className="info">Cards left: {GameUtils.allCards.length}</div>
          <button className="btn" onClick={() => setIsModalVisible(true)}>HOW TO</button>
          {!gameOver && <button onClick={highlightSetAutomatically} className="btn">HELP ME!</button>}
          {gameOver && <button onClick={restartGame} className="btn">RESTART</button>}
        </div>
      </div>
      <div className="cards-container">
        {renderBoard()}
        {gameOver && (<div className="gameOver">
          <div className="stamp">
            Game over
          </div>
        </div>)}
      </div>
      <RulesPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>

    </div>
  )
}
