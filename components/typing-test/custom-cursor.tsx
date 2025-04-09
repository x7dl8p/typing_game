"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const cursorX = useSpring(0, { damping: 25, stiffness: 150 })
  const cursorY = useSpring(0, { damping: 25, stiffness: 150 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: "12px",
        height: "12px",
        x: cursorX,
        y: cursorY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-full h-full rounded-full bg-white mix-blend-difference" />
    </motion.div>
  )
}