"use client"

import { useEffect } from "react"

export function CustomCursor() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      
      const x = (event.clientX / vw) * 100
      const y = (event.clientY / vh) * 100
      
      document.documentElement.style.setProperty('--cursor-x', `${x}vw`)
      document.documentElement.style.setProperty('--cursor-y', `${y}vh`)
    }

    const style = document.createElement('style')
    style.textContent = `
      :root {
        --cursor-x: 50vw;
        --cursor-y: 50vh;
      }
      
      * {
        cursor: none !important;
      }
      
      #custom-cursor-dot {
        position: fixed;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        left: var(--cursor-x);
        top: var(--cursor-y);
        transform: translate(-50%, -50%);
        z-index: 99999;
        transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
      }
      
      #custom-cursor-dot:hover {
        width: 12px;
        height: 12px;
      }
    `
    document.head.appendChild(style)

    // Create cursor element
    const cursor = document.createElement('div')
    cursor.id = 'custom-cursor-dot'
    document.body.appendChild(cursor)

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.head.removeChild(style)
      document.body.removeChild(cursor)
    }
  }, [])

  return null
}