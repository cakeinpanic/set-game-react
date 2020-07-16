import React from 'react'
import './GameHeader.scss'

export interface IHeaderProps {
  isGameOver: boolean
  restartGame: () => any
  hintSet: () => any
  cardsOnBoard: number
  openHelp: () => any
}

export const GameHeader = ({ cardsOnBoard, isGameOver, restartGame, hintSet, openHelp }: IHeaderProps) => {

  return (
    <div className="header">
      <div className="header-content">
        <h1>SET GAME</h1>
        <div className="btn-container">
          <div className="info">CARDS LEFT: {cardsOnBoard}</div>
          <button className="btn" onClick={openHelp}>HOW TO</button>
          {!isGameOver && <button onClick={hintSet} className="btn">HELP ME!</button>}
          {isGameOver && <button onClick={restartGame} className="btn">RESTART</button>}
        </div>
      </div>
    </div>

  )
}
