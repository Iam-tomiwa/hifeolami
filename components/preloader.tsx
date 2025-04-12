"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(interval)
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-rose-500 mb-8"
      >
        Hi Feolami
      </motion.div>

      <div className="w-64 h-2 bg-rose-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-rose-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-4 text-rose-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Loading your special messages...
      </motion.p>
    </div>
  )
}
