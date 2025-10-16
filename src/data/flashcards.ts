// Dữ liệu flashcard - Thêm/sửa/xóa nội dung ở đây
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

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    type: 'Tiếng Anh',
    question: 'Hello',
    answer: 'Xin chào'
  },
  {
    id: 2,
    type: 'Tiếng Anh',
    question: 'Thank you',
    answer: 'Cảm ơn'
  },
  {
    id: 3,
    type: 'Toán học',
    question: '2 + 2 = ?',
    answer: '4'
  },
  {
    id: 4,
    type: 'Toán học',
    question: '10 × 5 = ?',
    answer: '50'
  },
  {
    id: 5,
    type: 'Lịch sử',
    question: 'Năm 1945 có sự kiện gì?',
    answer: 'Cách mạng tháng Tám thành công'
  },
  {
    id: 6,
    type: 'Khoa học',
    question: 'Nước có công thức hóa học là gì?',
    answer: 'H2O'
  },
  {
    id: 7,
    type: 'Tiếng Anh',
    question: 'Good morning',
    answer: 'Chào buổi sáng'
  },
  {
    id: 8,
    type: 'Địa lý',
    question: 'Thủ đô của Việt Nam là gì?',
    answer: 'Hà Nội'
  }
]

// Validate data on export
export const validatedFlashcards = FlashcardValidator.validateFlashcards(flashcardsData)

// ===== HƯỚNG DẪN SỬ DỤNG =====
// 
// 1. THÊM FLASHCARD MỚI:
// {
//   id: 9,                           // ID unique (không trùng)
//   type: 'Tên loại',                // Loại flashcard
//   question: 'Câu hỏi',             // Mặt trước
//   answer: 'Câu trả lời'            // Mặt sau
// }
//
// 2. SỬA FLASHCARD:
// - Thay đổi nội dung question, answer, hoặc type
// - Giữ nguyên id để không bị lỗi
//
// 3. XÓA FLASHCARD:
// - Xóa bỏ object tương ứng
// - Hoặc comment lại với //
//
// 4. LƯU Ý:
// - ID phải là số duy nhất
// - Type có thể trùng (cùng loại sẽ được nhóm)
// - Không giới hạn số lượng flashcard
// - Lưu file lại để thấy thay đổi
//
// =============================