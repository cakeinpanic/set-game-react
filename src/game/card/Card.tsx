import React from 'react'
import './Card.scss'

export const Card = ({ value }: any) => {
  const getElements = () => {
    let elements = []
    for (let i = 0; i < value.amount; i++) {
      const className = ['item', value.color, value.shape, value.style].join(' ').toLowerCase()
      elements.push(<div className={className} key={className + i}></div>)
    }
    return elements
  }
  return (<div className="card">
    {getElements()}
  </div>)
}
