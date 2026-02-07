'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateMessage, type Mood } from '@/lib/messages'
import ShareButtons from './ShareButtons'
import { useTranslations } from '@/lib/i18n'
import { useToast } from '@/lib/toast'
import { ToastContainer } from './Toast'

export default function LoveMessageForm() {
  const t = useTranslations('loveMessage')
  const { toasts, showToast, removeToast } = useToast()
  const [yourName, setYourName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [selectedMood, setSelectedMood] = useState<Mood>('romantic')
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to generate
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && yourName.trim() && partnerName.trim() && !isGenerating) {
        e.preventDefault()
        handleGenerate()
      }
      // Escape to clear
      if (e.key === 'Escape' && generatedMessage) {
        setGeneratedMessage('')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourName, partnerName, generatedMessage, isGenerating])

  // Ensure translations are loaded
  if (!t || typeof t !== 'function') {
    return (
      <div className="glass-card p-6 sm:p-8 md:p-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">💌</div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }

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
      showToast(t('copyMessage') + ' ✓', 'success')
    } catch (err) {
      console.error('Failed to copy:', err)
      showToast('Failed to copy. Please try again.', 'error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
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
              <span>{t('yourName')}</span>
            </label>
            <input
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder={t('yourName')}
              maxLength={30}
              className="input-romantic text-base sm:text-lg"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg">💝</span>
              <span>{t('partnerName')}</span>
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder={t('partnerName')}
              maxLength={30}
              className="input-romantic text-base sm:text-lg"
            />
          </div>
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
            <span>✨</span>
            <span>{t('selectMood')}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {moods.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-2.5 sm:p-3 md:p-4 lg:p-5 rounded-xl sm:rounded-2xl border-2 transition-all relative overflow-hidden min-h-[80px] sm:min-h-[100px] md:min-h-[120px] touch-manipulation ${
                  selectedMood === mood.value
                    ? `border-rose-500 bg-gradient-to-br ${mood.color} text-white shadow-xl`
                    : 'border-pink-200 bg-white hover:border-pink-400 hover:bg-pink-50/50 active:border-pink-400 active:bg-pink-50/50'
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

        {/* Keyboard Shortcut Hint */}
        {yourName.trim() && partnerName.trim() && (
          <p className="text-xs text-gray-500 text-center mb-2">
            💡 Tip: Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Ctrl/Cmd + Enter</kbd> to generate
          </p>
        )}

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={!yourName.trim() || !partnerName.trim() || isGenerating}
          className="btn-primary w-full text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 lg:py-5 font-semibold min-h-[44px] touch-manipulation"
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
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRegenerate}
                    className="btn-secondary w-full py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] touch-manipulation"
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
                    className="btn-primary w-full py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] touch-manipulation"
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
