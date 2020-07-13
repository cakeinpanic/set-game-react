import { generateAllCards, ICard } from './set-utils'

class Game {
  allCards: ICard[] = []
  playedCards: ICard[] = []
  cardsOnTable: ICard[] = []

  constructor() {}

  startGame() {
    this.allCards = generateAllCards()
    this.cardsOnTable = this.allCards.splice(0, 9)
  }

  removeSelectedCards(selectedCards: number[]) {
    selectedCards.forEach((selectedIndex, i) => {
      this.playedCards.push(this.cardsOnTable[selectedIndex - i])
      this.cardsOnTable.splice(selectedIndex - i,1)
    })
  }

  drawNewCards() {
    const newCards = this.allCards.splice(0, 3)
    if (newCards.length > 0) {
      this.cardsOnTable.push(...newCards)
    }
  }
}

export const GameUtils = new Game()