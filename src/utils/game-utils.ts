import { findSet, generateAllCards, ICard } from './set-utils'

export type CardItem = ICard | null

export const SET_SIZE = 3
export const MIN_BOARD_SIZE = 12

class Game {
  allCards: ICard[] = []
  playedCards: ICard[] = []
  cardsOnTable: CardItem[] = []

  nextSet: number[] = []

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
      this.playedCards.push(this.cardsOnTable[selectedIndex] as ICard)
      this.cardsOnTable.splice(selectedIndex, 1, null)
    })

    this.recalculateNextSet()
  }

  replaceRemovedCardsWithNew() {
    if (!this.anyCardsLeft) {
      return
    }

    if (this.cardsOnTable.length < MIN_BOARD_SIZE + SET_SIZE) {
      this.drawCards(3)
    }

    while (this.nextSet.length === 0 && this.anyCardsLeft) {
      this.drawCards(1)
    }

    this.cardsOnTable = this.cardsOnTable.filter(card => card !== null)
  }

  private drawCards(amount = 1) {
    for (let i = 0; i < amount; i++) {
      const newCard = this.allCards.splice(0, 1)[0]
      const indexToReplace = this.cardsOnTable.indexOf(null)
      if (indexToReplace > -1) {
        this.cardsOnTable[indexToReplace] = newCard
      } else {
        this.cardsOnTable.push(newCard)
      }
    }

    this.recalculateNextSet()
  }

  private recalculateNextSet() {
    this.nextSet = findSet(this.cardsOnTable)
    console.log(this.nextSet)

  }
}

export const GameUtils = new Game()