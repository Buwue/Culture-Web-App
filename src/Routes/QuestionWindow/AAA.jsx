import { useState } from "react"
import { motion } from "motion/react"

/**
 * Flashcard component with a 3D flip animation.
 *
 * Usage:
 * <FlashCard front="What is the capital of France?" back="Paris" />
 */
function FlashCard({ front, back, className = "" }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`relative h-64 w-96 cursor-pointer [perspective:1200px] ${className}`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {/* Front face */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg [backface-visibility:hidden]">
          <p className="text-lg font-medium text-neutral-900">{front}</p>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-center shadow-lg [backface-visibility:hidden]">
          <p className="text-lg font-medium text-white">{back}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default FlashCard
