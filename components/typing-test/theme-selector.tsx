import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getThemeTextColor } from "./utils/theme-utils"
import { themes } from "./utils/theme-utils"

interface ThemeSelectorProps {
  theme: string
  setTheme: (theme: string) => void
  showThemeSelector: boolean
  toggleThemeSelector: () => void
}

export function ThemeSelector({
  theme,
  setTheme,
  showThemeSelector,
  toggleThemeSelector,
}: ThemeSelectorProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleThemeSelector}
        className={cn("text-sm", getThemeTextColor(theme))}
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
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 flex flex-col gap-1 rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-900"
          >
            {themes.map((t, index) => (
              <motion.button
                key={t.name}
                onClick={() => {
                  setTheme(t.name)
                  toggleThemeSelector()
                }}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-wider",
                  getThemeTextColor(t.name),
                  theme === t.name && "font-medium"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025 }}
              >
                {t.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}