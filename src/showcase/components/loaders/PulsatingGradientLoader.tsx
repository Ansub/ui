'use client'
import { m, LazyMotion, domAnimation } from 'framer-motion'

export default function PulsatingGradientLoader() {
  return (
    <div className="flex items-center justify-center">
      <LazyMotion features={domAnimation}>
        <m.div
          className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{ filter: 'blur(10px)' }}
        ></m.div>
      </LazyMotion>
    </div>
  )
}
