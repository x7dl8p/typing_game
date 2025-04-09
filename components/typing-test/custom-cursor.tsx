"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-white mix-blend-difference"
      animate={{
        x: mousePosition.x - 4,
        y: mousePosition.y - 4,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 150,
      }}
    />
  )
}