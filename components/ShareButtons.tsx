'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { copyToClipboard, getWhatsAppShareUrl, getTwitterShareUrl, shareContent } from '@/lib/utils'

interface ShareButtonsProps {
  text: string
  url?: string
  title?: string
}

export default function ShareButtons({ text, url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const textToCopy = url ? `${text}\n\n${url}` : text
    const success = await copyToClipboard(textToCopy)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleNativeShare = async () => {
    await shareContent({
      title: title || 'Valentine Message',
      text,
      url,
    })
  }

  const fullText = url ? `${text} ${url}` : text

  return (
    <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center">
      {/* Copy Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className={`px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 transition-all shadow-md relative overflow-hidden text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation ${
          copied 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30' 
            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 active:from-gray-200 active:to-gray-300'
        }`}
      >
        {copied ? (
          <>
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              className="text-lg"
            >
              ✓
            </motion.span>
            <span>Copied!</span>
            {/* Success ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </>
        ) : (
          <>
            <motion.span
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              📋
            </motion.span>
            <span>Copy</span>
          </>
        )}
      </motion.button>

      {/* WhatsApp */}
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={getWhatsAppShareUrl(fullText)}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold flex items-center gap-1.5 sm:gap-2 hover:from-green-600 hover:to-green-700 active:from-green-600 active:to-green-700 transition-all shadow-md shadow-green-500/30 relative overflow-hidden group text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation"
      >
        <motion.span
          whileHover={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          📱
        </motion.span>
        <span>WhatsApp</span>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
      </motion.a>

      {/* Twitter/X */}
      <motion.a
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={getTwitterShareUrl(text, url)}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold flex items-center gap-1.5 sm:gap-2 hover:from-gray-800 hover:to-gray-700 active:from-gray-800 active:to-gray-700 transition-all shadow-md relative overflow-hidden group text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation"
      >
        <motion.span
          whileHover={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.5 }}
        >
          𝕏
        </motion.span>
        <span>Tweet</span>
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
      </motion.a>

      {/* Native Share (Mobile) */}
      {typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined' && (
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNativeShare}
          className="px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold flex items-center gap-1.5 sm:gap-2 hover:from-rose-600 hover:to-pink-600 active:from-rose-600 active:to-pink-600 transition-all shadow-md shadow-rose-500/30 relative overflow-hidden group text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation"
        >
          <motion.span
            whileHover={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.5 }}
          >
            🔗
          </motion.span>
          <span>Share</span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
        </motion.button>
      )}
    </div>
  )
}
