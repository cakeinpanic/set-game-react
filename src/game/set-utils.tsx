const AMOUNT = [1, 2, 3]
const COLORS = ['RED', 'GREEN', 'BLUE']
const SHAPE = ['CIRCLE', 'SQUARE', 'TRIANGLE']
const STYLE = ['EMPTY', 'FILL', 'STRIPE']

export interface ICard {
  amount: string
  color: string
  shape: string
  style: string
}

export function generateAllCards(): ICard[] {
  let cards = [{}]
  cards = addQuality(cards, 'amount', AMOUNT)
  cards = addQuality(cards, 'color', COLORS)
  cards = addQuality(cards, 'shape', SHAPE)
  cards = addQuality(cards, 'style', STYLE)
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