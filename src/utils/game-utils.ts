import { findSet, generateAllCards, ICard } from './set-utils'

export const SET_SIZE = 3
export const MIN_BOARD_SIZE = 9
class Game {
  allCards: ICard[] = []
  playedCards: ICard[] = []
  cardsOnTable: ICard[] = []

  nextSet: number[] = []

  constructor() {}

  startGame() {
    this.allCards = generateAllCards()
    this.cardsOnTable = this.allCards.splice(0, MIN_BOARD_SIZE)

    this.recalculateNextSet()

    if (this.nextSet.length === 0) {
      this.startGame()
    }
  }

  get anyCardsLeft(): boolean {
    return this.allCards.length > 0
  }

  removeSelectedCards(selectedCards: number[]) {
    selectedCards.forEach((selectedIndex, i) => {
      this.playedCards.push(this.cardsOnTable[selectedIndex - i])
      this.cardsOnTable.splice(selectedIndex - i,1)
    })

    this.recalculateNextSet()
  }

  drawMoreCards() {
    if (!this.anyCardsLeft) {
      return
    }
    if (this.cardsOnTable.length < MIN_BOARD_SIZE) {
      this.drawCards(3)
    }

    while (this.nextSet.length === 0 && this.anyCardsLeft) {
      this.drawCards(1)
    }
  }

  private drawCards(amount = 1) {
    this.cardsOnTable.push(...this.allCards.splice(0, amount))
    this.recalculateNextSet()
  }

  private recalculateNextSet() {
    this.nextSet = findSet(this.cardsOnTable)
    console.log(this.nextSet)

  }
}

export const GameUtils = new Game()