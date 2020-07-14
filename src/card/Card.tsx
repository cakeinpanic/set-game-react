import React from 'react'
import './Card.scss'
import { ICard } from '../utils/set-utils'

export interface ICardProps {
  card: ICard,
  isSelected: boolean,
  onSelect: (p: boolean) => void
}

export const Card = ({ card, isSelected, onSelect }: ICardProps) => {

  const getElements = () => {
    let elements = []
    for (let i = 0; i < card.amount; i++) {
      const className = ['item', card.color, card.shape, card.style].join(' ').toLowerCase()
      elements.push(<div className={className} key={className + i}></div>)
    }
    return elements
  }

  return (
    <div className={'card ' + (isSelected ? 'selected' : '')} onClick={() => onSelect(!isSelected)}>
    {getElements()}
  </div>)
}
