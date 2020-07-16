import React from 'react'
import './Card.scss'
import { ICard } from '../utils/set-utils'
import classnames from 'classnames'

export interface ICardProps {
  card: ICard,
  isSelected: boolean,
  onSelect: (p: boolean) => void
  isHighlighted: boolean,
  isRemoving: boolean,
  style: any
}


export const Card = ({ style,isRemoving, card, isSelected, onSelect, isHighlighted }: ICardProps) => {

  const getElements = () => {
    let elements = []
    for (let i = 0; i < card.amount; i++) {

      const className = classnames('item', card.color, card.shape, card.style)
      elements.push(<div className={className} key={className + i}></div>)
    }
    return elements
  }

  const className = classnames('card', { selected: isSelected }, { highlighted: isHighlighted },
    { removing: isRemoving })

  return (
    <div className={className} onClick={() => onSelect(!isSelected)} style={style}>
    {getElements()}
  </div>)
}
