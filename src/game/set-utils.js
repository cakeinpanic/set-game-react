const AMOUNT = [1, 2, 3]
const COLORS = ['RED', 'GREEN', 'BLUE']
const SHAPE = ['CIRCLE', 'SQUARE', 'TRIANGLE']
const STYLE = ['EMPTY', 'FILL', 'STRIPE']

export function generateAllCards () {
  let cards = [{}]
  cards = addQuality(cards, 'amount', AMOUNT)
  cards = addQuality(cards, 'color', COLORS)
  cards = addQuality(cards, 'shape', SHAPE)
  cards = addQuality(cards, 'style', STYLE)
  return shuffle(cards)
}

function shuffle (array) {
  return array.sort(() => Math.random() - 0.5)
}

function addQuality (cards, qualityName, qualityValues) {
  return cards.map(card => {
    return qualityValues.map(value => ({ ...card, ...{ [qualityName]: value } }))
  }).flat(Infinity)
}