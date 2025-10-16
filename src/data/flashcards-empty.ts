// Test file for empty state - rename to flashcards.ts to test
export interface Flashcard {
  id: number
  type: string
  question: string
  answer: string
}

// Validation utilities
export class FlashcardValidator {
  static validateFlashcard(card: any): card is Flashcard {
    return (
      card &&
      typeof card.id === 'number' &&
      card.id > 0 &&
      typeof card.type === 'string' &&
      card.type.trim().length > 0 &&
      typeof card.question === 'string' &&
      card.question.trim().length > 0 &&
      typeof card.answer === 'string' &&
      card.answer.trim().length > 0
    )
  }

  static validateFlashcards(cards: any[]): Flashcard[] {
    if (!Array.isArray(cards)) {
      console.error('Flashcards data is not an array')
      return []
    }

    const validCards: Flashcard[] = []
    const seenIds = new Set<number>()

    cards.forEach((card, index) => {
      if (!this.validateFlashcard(card)) {
        console.error(`Invalid flashcard at index ${index}:`, card)
        return
      }

      if (seenIds.has(card.id)) {
        console.error(`Duplicate flashcard ID: ${card.id} at index ${index}`)
        return
      }

      seenIds.add(card.id)
      validCards.push(card)
    })

    return validCards
  }
}

// EMPTY ARRAY FOR TESTING EMPTY STATE
export const flashcardsData: Flashcard[] = []

// Validate data on export
export const validatedFlashcards = FlashcardValidator.validateFlashcards(flashcardsData)