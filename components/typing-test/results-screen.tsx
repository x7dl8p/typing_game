import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getThemeResultColor } from "./utils/theme-utils"

interface ResultsScreenProps {
  wpm: number
  accuracy: number
  theme: string
  setTheme: (theme: string) => void
  showThemeSelector: boolean
  toggleThemeSelector: () => void
  resetGame: () => void
}

export function ResultsScreen({
  wpm,
  accuracy,
  theme,
  resetGame,
}: ResultsScreenProps) {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-0 text-left">
        <div className="text-muted-foreground text-xl">wpm</div>
        <div className={cn("text-7xl font-normal", getThemeResultColor(theme))}>
          {wpm}
        </div>
        <div className="text-muted-foreground text-xl mt-6">acc</div>
        <div className={cn("text-7xl font-normal", getThemeResultColor(theme))}>
          {accuracy}%
        </div>
      </div>

      <div className="flex gap-4 mt-16">
        <Button
          onClick={resetGame}
          variant="ghost"
          className={cn("text-sm uppercase tracking-wider", getThemeResultColor(theme))}
        >
          start over
        </Button>
      </div>
    </div>
  )
}