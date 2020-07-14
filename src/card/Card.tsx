import React from 'react'
import './Card.scss'
import { ICard } from '../utils/set-utils'

export interface ICardProps {
  card: ICard,
  isSelected: boolean,
  onSelect: (p: boolean) => void
  isAutomaticAction: boolean
}

export const Card = ({ card, isSelected, onSelect, isAutomaticAction }: ICardProps) => {

  const getElements = () => {
    let elements = []
    for (let i = 0; i < card.amount; i++) {
      const className = ['item', card.color, card.shape, card.style].join(' ').toLowerCase()
      elements.push(<div className={className} key={className + i}></div>)
    }
    return elements
  }

  const className = ['card ', (isSelected ? 'selected' : ''), (isSelected && isAutomaticAction ? 'selected-auto': '')].join(' ')

  return (
    <div className={className} onClick={() => onSelect(!isSelected)}>
    {getElements()}
  </div>)
}
