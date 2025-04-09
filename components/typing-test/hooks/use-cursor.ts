import { useState, useEffect, RefObject } from "react"

interface CursorStyle {
  left: number
  top: number
  height: number
}

export const useCursor = (
  textContainerRef: RefObject<HTMLDivElement | null>,
  currentPosition: number,
  currentQuote: string,
  userInput: string
) => {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>({
    left: 0,
    top: 0,
    height: 0,
  })

  useEffect(() => {
    if (textContainerRef.current) {
      const textContainer = textContainerRef.current
      const chars = textContainer.querySelectorAll("span[data-char]")

      if (chars.length > 0 && currentPosition < chars.length) {
        const currentChar = chars[currentPosition]
        const rect = currentChar.getBoundingClientRect()
        const containerRect = textContainer.getBoundingClientRect()

        setCursorStyle({
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          height: rect.height,
        })
      }
    }
  }, [currentPosition, currentQuote, userInput])

  return cursorStyle
}