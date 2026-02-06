'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateMessage, type Mood } from '@/lib/messages'
import ShareButtons from './ShareButtons'
import { useTranslations } from '@/lib/i18n'

export default function LoveMessageForm() {
  const t = useTranslations('loveMessage')
  const [yourName, setYourName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [selectedMood, setSelectedMood] = useState<Mood>('romantic')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const moods: { value: Mood; label: string; icon: string; color: string }[] = [
    { value: 'romantic', label: t('moods.romantic'), icon: '💖', color: 'from-rose-500 to-pink-500' },
    { value: 'cute', label: t('moods.cute'), icon: '🥰', color: 'from-pink-400 to-fuchsia-400' },
    { value: 'funny', label: t('moods.funny'), icon: '😄', color: 'from-amber-400 to-orange-400' },
    { value: 'emotional', label: t('moods.emotional'), icon: '🥹', color: 'from-purple-500 to-pink-500' },
  ]

  const handleGenerate = async () => {
    if (!yourName.trim() || !partnerName.trim()) return
    
    setIsGenerating(true)
    setGeneratedMessage('')
    
    // Simulate a brief delay for effect
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const message = generateMessage(yourName.trim(), partnerName.trim(), selectedMood)
    setGeneratedMessage(message)
    setIsGenerating(false)
  }

  const handleRegenerate = () => {
    setGeneratedMessage('')
    handleGenerate()
  }

  const handleCopy = async () => {
    if (!generatedMessage) return
    try {
      await navigator.clipboard.writeText(generatedMessage)
      // Visual feedback handled by ShareButtons component
    } catch (err) {
      console.error('Failed to copy:', err)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <span>💫</span>
              <span>{t('yourName')}</span>
            </label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder={t('yourName')}
              maxLength={30}
              className="input-romantic"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
              <span>💝</span>
              <span>{t('partnerName')}</span>
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder={t('partnerName')}
              maxLength={30}
              className="input-romantic"
            />
          </div>
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span>✨</span>
            <span>{t('selectMood')}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {moods.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 transition-all relative overflow-hidden ${
                  selectedMood === mood.value
                    ? `border-rose-500 bg-gradient-to-br ${mood.color} text-white shadow-xl`
                    : 'border-pink-200 bg-white hover:border-pink-400 hover:bg-pink-50/50'
                }`}
              >
                {selectedMood === mood.value && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                <span className={`text-2xl sm:text-3xl block mb-1 sm:mb-2 relative z-10 ${selectedMood === mood.value ? 'drop-shadow-md' : ''}`}>
                  {mood.icon}
                </span>
                <span className={`text-xs sm:text-sm font-bold relative z-10 ${selectedMood === mood.value ? 'text-white' : 'text-gray-800'}`}>
                  {mood.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={!yourName.trim() || !partnerName.trim() || isGenerating}
          className="btn-primary w-full text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-5 font-semibold"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-lg sm:text-xl"
              >
                💖
              </motion.span>
              <span>{t('generating')}</span>
            </span>
          ) : (
            <span>{t('generateButton')}</span>
          )}
        </motion.button>
      </motion.div>

      {/* Generated Message */}
      <AnimatePresence>
        {generatedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-8"
          >
            <div className="glass-card p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative overflow-hidden">
              {/* Decorative hearts */}
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
              
              {/* Message Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                className="relative z-10"
              >
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-pink-200/50 shadow-lg relative overflow-hidden group">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-rose-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* Quote marks */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-2 sm:top-4 left-2 sm:left-4 text-4xl sm:text-5xl md:text-6xl text-rose-300/50 font-serif"
                  >
                    &ldquo;
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-4xl sm:text-5xl md:text-6xl text-rose-300/50 font-serif"
                  >
                    &rdquo;
                  </motion.div>
                  
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800 font-[family-name:var(--font-display)] italic text-center relative z-10 px-2">
                    {generatedMessage}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRegenerate}
                    className="btn-secondary w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      🔄
                    </motion.span>
                    <span>{t('generateAnother')}</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCopy}
                    className="btn-primary w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-2"
                  >
                    📋 {t('copyMessage')}
                  </motion.button>
                </div>
                
                <ShareButtons 
                  text={generatedMessage} 
                  title={t('shareTitle')}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
