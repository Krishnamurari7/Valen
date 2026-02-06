'use client'

import { useEffect, useState, useMemo } from 'react'

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  emoji: string
}

export default function FloatingHearts() {
  const hearts = useMemo(() => {
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '🌹', '✨']
    const newHearts: Heart[] = []
    
    // Reduced count for better performance, but more varied
    for (let i = 0; i < 12; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        size: 18 + Math.random() * 18,
        duration: 12 + Math.random() * 12,
        delay: Math.random() * 8,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      })
    }
    
    return newHearts
  }, [])

  return (
    <div className="floating-hearts">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            willChange: 'transform, opacity', // Performance optimization
          }}
          aria-hidden="true"
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
