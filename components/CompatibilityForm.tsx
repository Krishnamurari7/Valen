'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateCompatibility, compatibilityDisclaimer, type CompatibilityResult } from '@/lib/compatibility'
import ShareButtons from './ShareButtons'
import { toPng } from 'html-to-image'
import { useTranslations } from '@/lib/i18n'

export default function CompatibilityForm() {
  const t = useTranslations('compatibility')
  const [name1, setName1] = useState('')
  
  // Ensure translations are loaded
  if (!t || typeof t !== 'function') {
    return (
      <div className="glass-card p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">💕</div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }
  const [name2, setName2] = useState('')
  const [dob1, setDob1] = useState('')
  const [dob2, setDob2] = useState('')
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [displayPercentage, setDisplayPercentage] = useState(0)
  const resultCardRef = useRef<HTMLDivElement>(null)

  const handleCalculate = async () => {
    if (!name1.trim() || !name2.trim()) return

    setIsCalculating(true)
    setResult(null)
    setDisplayPercentage(0)

    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 500))

    const compatibility = calculateCompatibility(
      name1,
      name2,
      dob1 ? new Date(dob1) : undefined,
      dob2 ? new Date(dob2) : undefined
    )

    setResult(compatibility)
    setIsCalculating(false)

    // Animate percentage counter
    const targetPercentage = compatibility.percentage
    const duration = 2000
    const steps = 60
    const increment = targetPercentage / steps
    let current = 0
    
    const interval = setInterval(() => {
      current += increment
      if (current >= targetPercentage) {
        setDisplayPercentage(targetPercentage)
        clearInterval(interval)
      } else {
        setDisplayPercentage(Math.floor(current))
      }
    }, duration / steps)
  }

  const handleDownloadCard = async () => {
    if (!resultCardRef.current) return
    
    try {
      const dataUrl = await toPng(resultCardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      })
      
      const link = document.createElement('a')
      link.download = `${name1}-${name2}-compatibility.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to generate image:', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
      >
        {/* Name Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg">💫</span>
              <span>{t('firstName')}</span>
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder={t('firstName')}
              maxLength={30}
              className="input-romantic text-base sm:text-lg"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg">💝</span>
              <span>{t('secondName')}</span>
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder={t('secondName')}
              maxLength={30}
              className="input-romantic text-base sm:text-lg"
            />
          </div>
        </div>

        {/* Optional DOB Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <span>🎂</span>
              <span>{t('dob')}</span>
            </label>
            <input
              type="date"
              value={dob1}
              onChange={(e) => setDob1(e.target.value)}
              className="input-romantic"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <span>🎂</span>
              <span>{t('dob')}</span>
            </label>
            <input
              type="date"
              value={dob2}
              onChange={(e) => setDob2(e.target.value)}
              className="input-romantic"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCalculate}
          disabled={!name1.trim() || !name2.trim() || isCalculating}
          className="btn-primary w-full text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 lg:py-5 font-semibold min-h-[44px] touch-manipulation"
        >
          {isCalculating ? (
            <span className="flex items-center justify-center gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-xl"
              >
                💕
              </motion.span>
              {t('calculating')}
            </span>
          ) : (
            <span>{t('calculateButton')}</span>
          )}
        </motion.button>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="text-xs md:text-sm text-amber-800 text-center leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </motion.div>

      {/* Result Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8"
          >
            {/* Downloadable Result Card */}
            <div
              ref={resultCardRef}
              className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 space-y-6 sm:space-y-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fff5f7 0%, #ffe4e6 50%, #fce7f3 100%)' }}
            >
              {/* Decorative Elements */}
              <motion.div 
                className="absolute top-4 sm:top-6 left-4 sm:left-6 text-3xl sm:text-4xl md:text-5xl opacity-25"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💕
              </motion.div>
              <motion.div 
                className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-3xl sm:text-4xl md:text-5xl opacity-25"
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                💕
              </motion.div>

              {/* Names */}
              <div className="text-center relative z-10 px-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 font-[family-name:var(--font-display)] break-words">
                  {name1} <span className="text-rose-600">&</span> {name2}
                </h3>
              </div>

              {/* Percentage Display */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.6 }}
                className="flex flex-col items-center relative z-10"
              >
                <motion.div 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-2 sm:mb-3 drop-shadow-lg relative"
                  style={{ color: result.color }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      `0 0 0px ${result.color}`,
                      `0 0 20px ${result.color}40`,
                      `0 0 0px ${result.color}`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {displayPercentage}%
                </motion.div>
                <motion.div 
                  className="text-4xl sm:text-5xl mb-2 sm:mb-3"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {result.emoji}
                </motion.div>
                <motion.div 
                  className="text-xl sm:text-2xl md:text-3xl font-bold px-2"
                  style={{ color: result.color }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  {result.category}
                </motion.div>
              </motion.div>

              {/* Compatibility Meter */}
              <div className="relative z-10">
                <div className="h-6 bg-gray-200/60 rounded-full overflow-hidden shadow-inner relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="h-full rounded-full shadow-lg relative overflow-hidden"
                    style={{ 
                      background: `linear-gradient(90deg, ${result.color} 0%, #FFB6C1 100%)` 
                    }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    />
                  </motion.div>
                  {/* Percentage indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700"
                  >
                    {result.percentage}%
                  </motion.div>
                </div>
              </div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl font-medium relative z-10 px-2"
              >
                {result.message}
              </motion.p>

              {/* Branding */}
              <p className="text-center text-xs sm:text-sm text-gray-500 font-medium relative z-10">
                💝 Valentine All-in-One
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 sm:mt-6 md:mt-8 space-y-2.5 sm:space-y-3 md:space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadCard}
                className="btn-secondary w-full py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] touch-manipulation"
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  📥
                </motion.span>
                {t('downloadCard')}
              </motion.button>
              
              <ShareButtons 
                text={`${name1} & ${name2} have ${result.percentage}% compatibility! ${result.emoji} ${result.category}`}
                title={t('shareTitle')}
              />

              <button
                onClick={() => {
                  setResult(null)
                  setName1('')
                  setName2('')
                  setDob1('')
                  setDob2('')
                }}
                className="w-full text-gray-600 hover:text-rose-600 active:text-rose-600 transition-colors text-sm sm:text-base font-medium py-2.5 sm:py-3 min-h-[44px] touch-manipulation"
              >
                {t('calculateAgain')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
