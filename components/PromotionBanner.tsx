'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'

interface PromotionBannerProps {
  variant?: 'compact' | 'full'
  className?: string
}

export default function PromotionBanner({ variant = 'compact', className = '' }: PromotionBannerProps) {
  const t = useTranslations('promotion')
  
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`glass-card p-3 sm:p-4 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 border border-blue-200/30 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 w-full sm:w-auto">
            <span className="text-xl sm:text-2xl flex-shrink-0">🚀</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 text-center sm:text-left leading-tight">
                {t('compactText')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <motion.a
              href="https://codehubpro.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all duration-300 min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-2 touch-manipulation whitespace-nowrap flex-1 sm:flex-initial"
            >
              <span className="text-base sm:text-lg">🌐</span>
              <span className="hidden sm:inline">Visit</span>
            </motion.a>
            <motion.a
              href="tel:7209766715"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all duration-300 min-h-[40px] sm:min-h-[44px] flex items-center justify-center gap-2 touch-manipulation whitespace-nowrap flex-1 sm:flex-initial"
            >
              <span className="text-base sm:text-lg">📞</span>
              <span className="hidden sm:inline">Call</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`glass-card p-4 sm:p-6 md:p-8 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-rose-400/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 text-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-3xl sm:text-4xl md:text-5xl block mb-3 sm:mb-4"
        >
          🚀
        </motion.span>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 font-[family-name:var(--font-display)] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('bannerTitle')}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto">
          {t('bannerDescription')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <motion.a
            href="https://codehubpro.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-xl transition-all duration-300 min-h-[44px] flex items-center gap-2 touch-manipulation text-sm sm:text-base"
          >
            <span>🌐</span>
            <span>{t('visitWebsite')}</span>
          </motion.a>
          <motion.a
            href="tel:7209766715"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-xl transition-all duration-300 min-h-[44px] flex items-center gap-2 touch-manipulation text-sm sm:text-base"
          >
            <span>📞</span>
            <span>{t('callUs')}: 7209766715</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
