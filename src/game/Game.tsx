import React, { useEffect, useRef, useState } from 'react'
import { Card } from '../card/Card'
import './Game.scss'
import { checkIfSet } from '../utils/set-utils'
import { CardItem, GameUtils, MIN_BOARD_SIZE, SET_SIZE } from '../utils/game-utils'
import { RulesPopup } from './RulesPopup'
import { GameHeader } from './GameHeader'

const TIMEOUT = 500
const HINT_TIMEOUT = 2000;

const CARD_HEIGHT = 180
const CARD_WIDTH = 130

export interface ICardView {
  card: CardItem,
  isSelected: boolean
  isHinted: boolean
  isRemoving?: boolean
  isAppearing?: boolean
}

export const Game = () => {
  const [currentCards, setCurrentCards] = useState<ICardView[]>([])
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  let hintRemovingTimeout = useRef<any>(null)

  useEffect(() => {restartGame()}, [])
  //useEffect(() => {console.log(currentCards)}, [currentCards])

  useEffect(() => {
    const selectedCards = currentCards.filter((cardItem) => cardItem.isSelected && !cardItem.isRemoving)

    const handleSet = () => {
      setCurrentCards(currentCards.map(
        (item, i) => ({ ...item, isRemoving: currentCards[i].isSelected })))

      setTimeout(() => {
        const selectedCardsIndexes = currentCards.map(
          (cardItem, i) => cardItem.isSelected && !cardItem.isRemoving ? i : -1).filter(i => i > -1)

        GameUtils.replaceSelectedCards(selectedCardsIndexes)

        setCurrentCards(GameUtils.cardsOnTable.map((card, i) => ({
          card,
          isSelected: false,
          isHinted: false,
          isAppearing: selectedCardsIndexes.indexOf(i) > -1 || i >= currentCards.length
        })))
      }, TIMEOUT)
    }

    if (selectedCards.length === SET_SIZE) {
      clearTimeout(hintRemovingTimeout.current)
      const isSet = checkIfSet(selectedCards.map(({ card }) => card))
      if (isSet) {
        handleSet()
      } else {
        setTimeout(() => {
          setCurrentCards(currentCards.map((item) => ({ ...item, isSelected: false })))
        }, TIMEOUT)
      }
    }
  }, [currentCards])

  useEffect(() => {setIsGameOver(GameUtils.nextSet.length === 0)}, [currentCards])

  const onCardSelect = (isSelected: boolean, cardIndex: number) => {
    const updatedCards = currentCards.map(
      (item, i) => ({ ...item, isSelected: i === cardIndex ? isSelected : item.isSelected, isHinted: false }))
    setCurrentCards(updatedCards)
  }


  const hintSet = () => {
    const setCards = GameUtils.nextSet
    if (setCards.length) {
      const updatedCards = currentCards.map((item, i) => ({ ...item, isHinted: setCards.indexOf(i) > -1 }))
      setCurrentCards(updatedCards)
    }

    hintRemovingTimeout.current = setTimeout(
      () => {
        const updatedCards = currentCards.map((item) => ({ ...item, isHinted: false }))
        setCurrentCards(updatedCards)
      },
      HINT_TIMEOUT)
  }

  const restartGame = () => {
    GameUtils.startGame()
    setCurrentCards(GameUtils.cardsOnTable.map(card => ({ card, isSelected: false, isHinted: false })))
  }

  const renderBoard = () => {
    const shiftX = currentCards.length > MIN_BOARD_SIZE ? CARD_WIDTH / 2 : 0
    return currentCards.map((item, index) => {

      if (item.card === null) {
        return <div key={index}></div>
      }

      const top = index < MIN_BOARD_SIZE ? Math.floor(index / 4) * CARD_HEIGHT : (index % MIN_BOARD_SIZE) * CARD_HEIGHT
      const left = index < MIN_BOARD_SIZE ? (index % 4) * CARD_WIDTH : CARD_WIDTH * 4

      const divStyle = {
        top: top + 'px',
        left: (left - shiftX) + 'px'
      }

      return (<Card key={index}
                    card={item.card}
                    style={divStyle}
                    isRemoving={!!item.isRemoving}
                    isSelected={item.isSelected}
                    isHighlighted={item.isHinted}
                    onSelect={(newStatus) => onCardSelect(newStatus, index)}/>)
    })
  }

  return (
    <div className="game">
      <GameHeader openHelp={() => setIsModalVisible(true)}
                  hintSet={() => hintSet()}
                  cardsOnBoard={GameUtils.allCards.length}
                  restartGame={() => restartGame()}
                  isGameOver={isGameOver}/>
      <div className="cards-container">
        {renderBoard()}
      </div>
      {isGameOver && (
        <div className="gameOver-stamp">
          Game over
        </div>)}
      <RulesPopup isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>

    </div>
  )
}
