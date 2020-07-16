import { CardItem } from './game-utils'

export enum COLORS {RED = 'red', GREEN = 'green', BLUE = 'blue'}
export enum SHAPE {CIRCLE = 'circle', SQUARE = 'square', ROMB = 'romb'}
export enum STYLE {EMPTY = 'empty', FILL = 'fill', STRIPE = 'stripe'}

export interface ICard {
  amount: number
  color: string
  shape: string
  style: string
}

export function generateAllCards(): ICard[] {
  let cards = [{}]
  const AMOUNT = [1, 2, 3]

  cards = addType(cards, 'amount', AMOUNT)
  cards = addType(cards, 'color', [COLORS.BLUE, COLORS.RED, COLORS.GREEN])
  cards = addType(cards, 'shape', [SHAPE.SQUARE, SHAPE.CIRCLE, SHAPE.ROMB])
  cards = addType(cards, 'style', [STYLE.EMPTY, STYLE.FILL, STYLE.STRIPE])
  return shuffle(cards) as ICard[]
}

export function checkIfSet(cards: CardItem[]): boolean {
  return cards.length === 3 &&
    canMakeSetByType(cards, 'amount') &&
    canMakeSetByType(cards, 'color') &&
    canMakeSetByType(cards, 'shape') &&
    canMakeSetByType(cards, 'style')
}

function canMakeSetByType(cards: CardItem[], qualityName: string): boolean {
  const q: any[] = cards.map(card => card && (card as any)[qualityName])
  const uniq = new Set(q)
  return uniq.size === 1 || uniq.size === cards.length
}

export function findSet(cards: CardItem[]): number[] {
  for (let i = 0; i < cards.length; i++) {
    if (!cards[i]) continue
    for (let j = i + 1; j < cards.length; j++) {
      if (!cards[j]) continue
      for (let k = j + 1; k < cards.length; k++) {
        if (!cards[k]) continue
        if (checkIfSet([cards[i], cards[j], cards[k]])) {
          return [i, j, k]
        }
      }
    }
  }
  return []
}

function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5)
}

function addType(cards: any[], qualityName: string, qualityValues: any[]) {
  return cards.map(card => {
    return qualityValues.map(value => ({ ...card, ...{ [qualityName]: value } }))
  }).flat(Infinity)
}
