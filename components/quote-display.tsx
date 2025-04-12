"use client"

import { useState, useEffect } from "react"
import { motion, type PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Quote } from "lucide-react"

interface QuoteDisplayProps {
  quote: string
  author: string
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

export default function QuoteDisplay({ quote, author, onSwipeLeft, onSwipeRight }: QuoteDisplayProps) {
  const [exitX, setExitX] = useState<number>(0)
  const controls = useAnimation()

  // Motion values for the card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  // Handle drag end
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x
    const threshold = 100

    if (Math.abs(xOffset) > threshold) {
      // Set the exit direction
      setExitX(xOffset > 0 ? 200 : -200)

      // Animate the card off screen
      controls
        .start({
          x: xOffset > 0 ? 500 : -500,
          opacity: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          // Call the appropriate callback
          if (xOffset > 0) {
            onSwipeRight()
          } else {
            onSwipeLeft()
          }
        })
    } else {
      // Return to center if not swiped far enough
      controls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      })
    }
  }

  // Reset animation when quote changes
  useEffect(() => {
    x.set(0)
    y.set(0)
    controls.set({ x: 0, y: 0, opacity: 1 })
  }, [quote, controls, x, y])

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {/* Background card (for stack effect) */}
      <div className="absolute w-[90%] h-[90%] bg-white rounded-2xl shadow-sm border border-rose-100 transform rotate-[-2deg] translate-x-2 translate-y-2"></div>
      <div className="absolute w-[95%] h-[95%] bg-white rounded-2xl shadow-sm border border-rose-100 transform rotate-[1deg] translate-x-[-1px] translate-y-1"></div>

      {/* Main card with swipe functionality */}
      <motion.div
        className="absolute w-full h-full bg-white rounded-2xl shadow-lg p-6 flex flex-col cursor-grab active:cursor-grabbing"
        style={{ x, y, rotate, opacity }}
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.02 }}
      >
        <div className="flex flex-col items-center justify-between h-full">
          <Quote className="text-rose-300 mb-2 h-8 w-8" />

          <div className="flex-grow flex items-center justify-center">
            <p className="text-xl text-center font-medium text-gray-800 italic">{quote}</p>
          </div>

          <div className="self-end mt-4">
            <p className="text-rose-500 font-semibold">— {author}</p>
          </div>
        </div>

        {/* Swipe indicators */}
        <motion.div
          className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-md text-sm font-bold"
          style={{ opacity: useTransform(x, [0, 50, 100], [0, 0.5, 1]) }}
        >
          LIKE
        </motion.div>

        <motion.div
          className="absolute top-4 left-4 bg-rose-500 text-white px-2 py-1 rounded-md text-sm font-bold"
          style={{ opacity: useTransform(x, [0, -50, -100], [0, 0.5, 1]) }}
        >
          NEXT
        </motion.div>
      </motion.div>

      {/* Swipe instructions */}
      <div className="absolute bottom-[-40px] text-center w-full text-xs text-rose-700">
        Swipe left or right to see more quotes
      </div>
    </div>
  )
}
