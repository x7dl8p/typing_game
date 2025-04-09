"use client"

import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ThemeSelector } from "./theme-selector"
import { ResultsScreen } from "./results-screen"
import { useTypingGame } from "./hooks/use-typing-game"
import { useCursor } from "./hooks/use-cursor"
import { getCursorColor, getErrorColor, getThemeTextColor } from "./utils/theme-utils"

interface TypingTestProps {
  quotes: string[]
}

export default function TypingTest({ quotes }: TypingTestProps) {
  const [mounted, setMounted] = useState(false)
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const { theme, setTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  const {
    currentQuote,
    userInput,
    wpm,
    liveWpm,
    accuracy,
    isFinished,
    isStarted,
    currentPosition,
    handleKeyDown,
    resetGame,
  } = useTypingGame({ quotes })

  const cursorStyle = useCursor(textContainerRef, currentPosition, currentQuote, userInput)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus()
    }
  }, [isFinished])

  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector)
  }

  if (!mounted) return null

  const Header = () => (
    <div className="fixed top-0 left-0 w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ThemeSelector
            theme={theme || "light"}
            setTheme={setTheme}
            showThemeSelector={showThemeSelector}
            toggleThemeSelector={toggleThemeSelector}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("text-sm", getThemeTextColor(theme))}
                  onClick={() => window.open("https://mohammad.is-a.dev", "_blank")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="sr-only">Developer Profile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Developer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-white uppercase tracking-wider" style={{ 
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
          }}>
            LONG LIVE GAZA
          </span>
          <div className="flex">
            {/* Palestinian Flag */}
            <div className="w-6 h-4 relative overflow-hidden rounded-sm shadow-sm">
              <div className="absolute top-0 w-full h-1/3 bg-black"></div>
              <div className="absolute top-1/3 w-full h-1/3 bg-white"></div>
              <div className="absolute bottom-0 w-full h-1/3 bg-[#149954]"></div>
              <div className="absolute h-full w-2/5 bg-[#CE1126] left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isFinished) {
    return (
      <>
        <Header />
        <ResultsScreen
          wpm={wpm}
          accuracy={accuracy}
          theme={theme || "light"}
          setTheme={setTheme}
          showThemeSelector={showThemeSelector}
          toggleThemeSelector={toggleThemeSelector}
          resetGame={resetGame}
        />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center gap-3 py-8 px-4 mt-16">
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="w-full max-w-3xl max-h-80 overflow-y-auto focus:outline-none focus:ring-0"
        >
          <div ref={textContainerRef} className="relative text-lg md:text-xl leading-relaxed">
            <span
              className={cn(
                "absolute w-0.5 will-change-transform",
                getCursorColor(theme),
                isStarted ? "" : "animate-cursor"
              )}
              style={{
                left: `${cursorStyle.left}px`,
                top: `${cursorStyle.top}px`,
                height: `${cursorStyle.height}px`,
                transition: "all 30ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
              }}
            />

            {currentQuote.split("").map((char, index) => {
              let style = "opacity-40"

              if (index < userInput.length) {
                if (userInput[index] === char) {
                  style = "opacity-100"
                } else {
                  style = cn(getErrorColor(theme), "opacity-100")
                }
              }

              return (
                <span key={index} data-char={index} className={style}>
                  {char}
                </span>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            "text-sm mt-4 flex items-center gap-1.5 h-5",
            getThemeTextColor(theme)
          )}
        >
          {isStarted ? (
            <>
              <span className="font-medium">{liveWpm}</span>
              <span className="uppercase text-xs tracking-wider">wpm</span>
            </>
          ) : (
            <span className="text-xs uppercase tracking-wider">click and start typing</span>
          )}
        </div>

        <Button
          onClick={resetGame}
          variant="ghost"
          size="sm"
          className={cn("mt-2 text-xs uppercase tracking-wider", getThemeTextColor(theme))}
        >
          Reset
        </Button>
      </div>
    </>
  )
}