import React, { useEffect, useState } from 'react'
import { Card } from '../card/Card'
import './Game.scss'
import { checkIfSet } from '../utils/set-utils'
import { CardItem, GameUtils, SET_SIZE } from '../utils/game-utils'
import { RulesPopup } from './RulesPopup'

const TIMEOUT = 500
const HINT_TIMEOUT = 2000;
export const Game = () => {
  const [currentCards, setCurrentCards] = useState<CardItem[]>([])
  const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([])
  const [hintedCardIndexes, setHintedCardIndexes] = useState<number[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  useEffect(() => {restartGame()}, [])
  useEffect(() => {console.log(currentCards)}, [currentCards])

  useEffect(() => {
    const handleSet = () => {
      GameUtils.removeSelectedCards(selectedCardIndexes)
      setSelectedCardIndexes([])
      setCurrentCards([...GameUtils.cardsOnTable])

      setTimeout(() => {
        GameUtils.replaceRemovedCardsWithNew()
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
    setHintedCardIndexes([])
    if (selectedCardIndexes.indexOf(cardIndex) === -1 && isSelected) {
      setSelectedCardIndexes([...selectedCardIndexes, cardIndex])
      return
    }
    setSelectedCardIndexes(selectedCardIndexes.filter(index => index !== cardIndex))

  }

  const hintSet = () => {
    const setCards = GameUtils.nextSet
    if (setCards.length) {
      setHintedCardIndexes(setCards)
    }
    setTimeout(()=>setHintedCardIndexes([]), HINT_TIMEOUT)
  }

  const restartGame = () => {
    GameUtils.startGame()
    setCurrentCards([...GameUtils.cardsOnTable])
  }

  const renderBoard = () => {
    const cardHeight = 180
    const cardWidth = 130

    return currentCards.map((card, index) => {
      if (!card) {
        return <div key={index}></div>
      }
      const top = Math.floor(index / 4) * cardHeight
      const left = (index % 4) * cardWidth

      const divStyle = {
        top: top + 'px',
        left: left + 'px'
      }

      return (<Card key={index}
                    card={card}
                    style={divStyle}
                    isSelected={selectedCardIndexes.indexOf(index) > -1}
                    isHighlighted={hintedCardIndexes.indexOf(index) > -1}
                    onSelect={(newStatus) => onCardSelect(newStatus, index)}/>)
    })
  }

  return (
    <div className="game">
      <div className="header">
        <h1>SET GAME</h1>
        <div className="btn-container">
          <div className="info">CARDS LEFT: {GameUtils.allCards.length}</div>
          <button className="btn" onClick={() => setIsModalVisible(true)}>HOW TO</button>
          {!gameOver && <button onClick={hintSet} className="btn">HELP ME!</button>}
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
