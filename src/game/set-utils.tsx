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

export function checkIfSet(cards: ICard[]): boolean {
  return isQualitySetable(cards, 'amount') && isQualitySetable(cards, 'color') &&
    isQualitySetable(cards, 'shape') && isQualitySetable(cards, 'style')
}

function isQualitySetable(cards: ICard[], qualityName: string): boolean {
  const q: any[] = cards.map(card => (card as any)[qualityName])
  const uniq = new Set(q)
  return uniq.size === 1 || uniq.size === cards.length

}
function shuffle(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5)
}

function addQuality(cards: any[], qualityName: string, qualityValues: any[]) {
  return cards.map(card => {
    return qualityValues.map(value => ({ ...card, ...{ [qualityName]: value } }))
  }).flat(Infinity)
}

