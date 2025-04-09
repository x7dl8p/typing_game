import { useState, useEffect, useRef } from "react"
import { calculateWPM, calculateAccuracy, getRandomQuote } from "../utils/typing-utils"

interface UseTypingGameProps {
  quotes: string[]
}

interface UseTypingGameReturn {
  currentQuote: string
  userInput: string
  startTime: number | null
  endTime: number | null
  wpm: number
  liveWpm: number
  accuracy: number
  isFinished: boolean
  isStarted: boolean
  currentPosition: number
  handleKeyDown: (e: React.KeyboardEvent) => void
  resetGame: () => void
}

export const useTypingGame = ({ quotes }: UseTypingGameProps): UseTypingGameReturn => {
  const [currentQuote, setCurrentQuote] = useState("")
  const [userInput, setUserInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [liveWpm, setLiveWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [isFinished, setIsFinished] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const wpmIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const initGame = () => {
    setCurrentQuote(getRandomQuote(quotes))
    setUserInput("")
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setLiveWpm(0)
    setAccuracy(100)
    setIsFinished(false)
    setIsStarted(false)
    setCurrentPosition(0)

    if (wpmIntervalRef.current) {
      clearInterval(wpmIntervalRef.current)
      wpmIntervalRef.current = null
    }
  }

  useEffect(() => {
    initGame()
    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isStarted && !isFinished) {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current)
      }

      wpmIntervalRef.current = setInterval(() => {
        setLiveWpm(calculateWPM(startTime, userInput, isStarted))
      }, 1000)

      setLiveWpm(calculateWPM(startTime, userInput, isStarted))
    }

    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current)
      }
    }
  }, [isStarted, isFinished, userInput, startTime])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.ctrlKey ||
      e.altKey ||
      e.metaKey ||
      e.key === "Shift" ||
      e.key === "Control" ||
      e.key === "Alt" ||
      e.key === "Meta" ||
      e.key === "Tab" ||
      e.key === "CapsLock" ||
      e.key === "Escape"
    ) {
      return
    }

    if (e.key !== "Backspace") {
      e.preventDefault()
    }

    if (!isStarted && !startTime) {
      setStartTime(Date.now())
      setIsStarted(true)
    }

    if (e.key === "Backspace" && currentPosition > 0) {
      e.preventDefault()
      setCurrentPosition(currentPosition - 1)
      setUserInput(userInput.slice(0, -1))
      return
    }

    if (currentPosition >= currentQuote.length) {
      return
    }

    if (e.key.length === 1) {
      const newUserInput = userInput + e.key
      setUserInput(newUserInput)
      setCurrentPosition(currentPosition + 1)

      setAccuracy(calculateAccuracy(newUserInput, currentQuote))

      if (newUserInput === currentQuote || currentPosition + 1 >= currentQuote.length) {
        setEndTime(Date.now())
        setIsFinished(true)
        setWpm(calculateWPM(startTime, newUserInput, isStarted))

        if (wpmIntervalRef.current) {
          clearInterval(wpmIntervalRef.current)
          wpmIntervalRef.current = null
        }
      }
    }
  }

  return {
    currentQuote,
    userInput,
    startTime,
    endTime,
    wpm,
    liveWpm,
    accuracy,
    isFinished,
    isStarted,
    currentPosition,
    handleKeyDown,
    resetGame: initGame,
  }
}