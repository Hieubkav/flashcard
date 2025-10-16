'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Shuffle, Eye, EyeOff, Filter, Plus, RotateCcw } from 'lucide-react'
import { validatedFlashcards, Flashcard } from '@/data/flashcards'

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Flashcard App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f5f1e6] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-stone-100 rounded-3xl shadow-xl p-8 text-center border border-stone-200">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-stone-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 mb-2">Oops! Something went wrong</h2>
            <p className="text-stone-600 mb-6">Please refresh the page or check your data file.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-stone-700 text-stone-100 rounded-2xl font-medium hover:bg-stone-800 transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Empty State Component
const EmptyState = () => {
  return (
    <div className="min-h-screen bg-[#f5f1e6] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-stone-700 mb-4">
            Flashcard
          </h1>
        </div>

        <div className="bg-stone-100 rounded-3xl shadow-xl p-12 text-center border border-stone-200">
          <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-12 h-12 text-stone-600" />
          </div>
          
          <h2 className="text-2xl font-semibold text-stone-800 mb-3">No Flashcards Available</h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            Get started by adding your first flashcard in the data file.
          </p>

          <div className="bg-stone-200/60 rounded-2xl p-6 text-left border border-stone-200">
            <h3 className="font-semibold text-stone-800 mb-3">How to add flashcards:</h3>
            <ol className="space-y-2 text-sm text-stone-700">
              <li>1. Open <code className="bg-stone-300 px-2 py-1 rounded">src/data/flashcards.ts</code></li>
              <li>2. Add new objects to the flashcardsData array</li>
              <li>3. Save the file to see changes</li>
            </ol>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-stone-700 text-stone-100 rounded-2xl font-medium hover:bg-stone-800 transition-colors duration-200"
          >
            Reload After Adding Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(validatedFlashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selectedType, setSelectedType] = useState('Tất cả')
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // Lấy danh sách các type duy nhất
  const types = ['Tất cả', ...Array.from(new Set(flashcards.map(card => card.type)))]

  // Lọc flashcard theo type
  const filteredFlashcards = selectedType === 'Tất cả' 
    ? flashcards 
    : flashcards.filter(card => card.type === selectedType)

  // Reset index khi thay đổi filter
  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [selectedType])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (filteredFlashcards.length === 0) return

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        prevCard()
        break
      case 'ArrowRight':
        e.preventDefault()
        nextCard()
        break
      case ' ':
      case 'Enter':
        e.preventDefault()
        flipCard()
        break
      case 's':
        e.preventDefault()
        shuffleFlashcards()
        break
      case 'a':
        e.preventDefault()
        toggleShowAll()
        break
    }
  }, [filteredFlashcards.length, currentIndex, isFlipped, showAll])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Focus management
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus()
    }
  }, [currentIndex])

  // Xáo trộn flashcard
  const shuffleFlashcards = () => {
    const shuffled = [...filteredFlashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  // Lật/úp tất cả flashcard
  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  // Xử lý swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < filteredFlashcards.length - 1) {
      nextCard()
    }
    if (isRightSwipe && currentIndex > 0) {
      prevCard()
    }
  }

  const nextCard = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const currentCard = filteredFlashcards[currentIndex]

  // Handle empty state
  if (flashcards.length === 0) {
    return <EmptyState />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f5f1e6] text-stone-800">
        <div className="max-w-lg mx-auto min-h-screen flex flex-col p-4">
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-stone-700 text-stone-100 px-4 py-2 rounded-lg"
          >
            Skip to main content
          </a>

          {/* Header */}
            <header className="text-center py-6">
              <h1 className="text-3xl font-semibold text-stone-800 mb-2">
                Flashcard
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm text-stone-600">
                <span>Flashcard</span>
                <span className="font-semibold text-stone-800" aria-label={`Current flashcard ${currentIndex + 1} of ${filteredFlashcards.length}`}>
                  {currentIndex + 1}/{filteredFlashcards.length}
                </span>
                <span>trong {selectedType}</span>
              </div>
          </header>

          {/* Controls */}
          <div className="flex gap-3 mb-6">
            {/* Filter Dropdown */}
              <div className="relative flex-1">
                <label htmlFor="type-filter" className="sr-only">Filter by type</label>
                <select
                  id="type-filter"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-sm rounded-2xl appearance-none bg-stone-100 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:bg-stone-50 transition-all text-stone-800"
                  aria-label="Filter flashcards by type"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" aria-hidden="true" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={shuffleFlashcards}
                  className="px-4 py-3 bg-stone-200 text-stone-800 rounded-2xl border border-stone-300 hover:bg-stone-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-stone-500"
                  aria-label="Shuffle flashcards (S key)"
                  title="Shuffle (S key)"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleShowAll}
                  className="px-4 py-3 bg-stone-200 text-stone-800 rounded-2xl border border-stone-300 hover:bg-stone-300 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-stone-500"
                  aria-label={showAll ? "Hide all answers (A key)" : "Show all answers (A key)"}
                  title={showAll ? "Hide answers (A key)" : "Show answers (A key)"}
                >
                  {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
          </div>

          {/* Main Content */}
          <main id="main-content" className="flex-1 flex items-center justify-center mb-6">
            {currentCard && (
              <div 
                className="w-full max-w-sm"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  ref={cardRef}
                  className="relative aspect-[3/4] cursor-pointer"
                  onClick={flipCard}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      flipCard()
                    }
                  }}
                  style={{ perspective: '1000px' }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Flashcard: ${currentCard.question}. Press Enter or Space to flip.`}
                  aria-pressed={isFlipped || showAll}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
                      isFlipped || showAll ? 'rotate-y-180' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front of card */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-white to-stone-100 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 overflow-hidden backface-hidden border border-stone-200"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-medium">
                        {currentCard.type}
                      </div>
                      <div className="flex-1 w-full overflow-y-auto text-center text-[1.375rem] md:text-[1.65rem] font-bold text-stone-800 leading-relaxed pr-1">
                        {currentCard.question}
                      </div>
                      <div className="text-xs text-stone-400 flex items-center gap-1 justify-center pt-4">
                        <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
                        <span>Press Space or Enter to flip</span>
                        <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div 
                      className="absolute inset-0 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 overflow-hidden rotate-y-180 backface-hidden bg-gray-900 text-gray-100"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                      aria-hidden={!isFlipped && !showAll}
                    >
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-stone-800 text-stone-100 text-xs font-medium border border-stone-600">
                        {currentCard.type}
                      </div>
                      <div className="flex-1 w-full overflow-y-auto text-center text-[0.875rem] md:text-[1.05rem] font-bold leading-relaxed pr-1">
                        {currentCard.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Navigation */}
          <nav className="flex items-center gap-4 mb-8" aria-label="Flashcard navigation">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 flex items-center justify-center ${
                currentIndex === 0 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300 shadow-sm'
              }`}
              aria-label="Previous flashcard (Left arrow key)"
              title="Previous (← key)"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>

            <div className="flex-1 max-w-full overflow-x-auto px-1" aria-label="Progress indicators">
              <div className="flex items-center gap-2 min-w-max pr-3">
                {filteredFlashcards.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-none transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 h-2 bg-stone-600 rounded-full' 
                        : 'w-2 h-2 bg-stone-300 rounded-full hover:bg-stone-400'
                    }`}
                    aria-label={`Flashcard ${index + 1} ${index === currentIndex ? '(current)' : ''}`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextCard}
              disabled={currentIndex === filteredFlashcards.length - 1}
              className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-stone-500 flex items-center justify-center ${
                currentIndex === filteredFlashcards.length - 1 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                  : 'bg-stone-200 text-stone-700 hover:bg-stone-300 shadow-sm'
              }`}
              aria-label="Next flashcard (Right arrow key)"
              title="Next (→ key)"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </nav>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={filteredFlashcards.length}>
              <div 
                className="h-full bg-stone-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / filteredFlashcards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <footer className="text-center text-xs text-stone-500 space-y-1">
            <p>Keyboard: ← → Navigate | Space/Enter Flip | S Shuffle | A Show/Hide All</p>
          </footer>
        </div>

        <style jsx>{`
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
        `}</style>
      </div>
    </ErrorBoundary>
  )
}
