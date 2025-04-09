export const calculateWPM = (startTime: number | null, userInput: string, isStarted: boolean) => {
  if (!startTime || !isStarted) return 0

  const timeInMinutes = (Date.now() - startTime) / 60000
  const wordCount = userInput.length / 5 // standard: 5 chars = 1 word

  if (timeInMinutes === 0) return 0
  return Math.round(wordCount / timeInMinutes)
}

export const calculateAccuracy = (userInput: string, currentQuote: string) => {
  if (userInput.length === 0) return 100

  let correctChars = 0
  for (let i = 0; i < userInput.length; i++) {
    if (i < currentQuote.length && userInput[i] === currentQuote[i]) {
      correctChars++
    }
  }
  return Math.floor((correctChars / userInput.length) * 100)
}

export const getRandomQuote = (quotes: string[]) => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  return quotes[randomIndex]
}