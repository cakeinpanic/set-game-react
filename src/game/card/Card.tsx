import React, { useState } from 'react'
import './Card.scss'
import { ICard } from '../set-utils'

export interface ICardProps {
  value: ICard,
  isSelected: boolean,
  onSelect: (p: boolean) => void
}

export const Card = ({ value, isSelected, onSelect }: ICardProps) => {

  const getElements = () => {
    let elements = []
    for (let i = 0; i < value.amount; i++) {
      const className = ['item', value.color, value.shape, value.style].join(' ').toLowerCase()
      elements.push(<div className={className} key={className + i}></div>)
    }
    return elements
  }

  return (
    <div className={'card ' + (isSelected ? 'selected' : '')} onClick={() => onSelect(!isSelected)}>
    {getElements()}
  </div>)
}
