export enum COLORS {RED = 'RED', GREEN = 'GREEN', BLUE = 'BLUE'}

export enum SHAPE {CIRCLE = 'CIRCLE', SQUARE = 'SQUARE', ROMB = 'ROMB'}

export enum STYLE {EMPTY = 'EMPTY', FILL = 'FILL', STRIPE = 'STRIPE'}

export interface ICard {
  amount: number
  color: string
  shape: string
  style: string
}

export function generateAllCards(): ICard[] {
  let cards = [{}]
  const AMOUNT = [1, 2, 3]

  cards = addQuality(cards, 'amount', AMOUNT)
  cards = addQuality(cards, 'color', [COLORS.BLUE, COLORS.RED, COLORS.GREEN])
  cards = addQuality(cards, 'shape', [SHAPE.SQUARE, SHAPE.CIRCLE, SHAPE.ROMB])
  cards = addQuality(cards, 'style', [STYLE.EMPTY, STYLE.FILL, STYLE.STRIPE])
  return shuffle(cards) as ICard[]
}

function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5)
}

function addQuality(cards: any[], qualityName: string, qualityValues: any[]) {
  return cards.map(card => {
    return qualityValues.map(value => ({ ...card, ...{ [qualityName]: value } }))
  }).flat(Infinity)
}