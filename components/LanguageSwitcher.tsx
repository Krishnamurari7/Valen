'use client'

import { useLocale } from '@/lib/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
]

export default function LanguageSwitcher() {
  const [locale, setLocale] = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure dropdown is closed on mount/refresh - use useLayoutEffect for immediate effect
  useLayoutEffect(() => {
    setIsOpen(false)
  }, [])

  // Also ensure it's closed after hydration
  useEffect(() => {
    setIsOpen(false)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isOpen])

  const handleLanguageChange = (newLocale: 'en' | 'hi') => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    // Set cookie immediately
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `locale=${newLocale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
    
    // Update state
    setLocale(newLocale)
    setIsOpen(false)
    
    // Reload page to apply translations
    window.location.reload()
  }

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  if (!currentLanguage) {
    return null
  }

  return (
    <div ref={containerRef} className="relative z-[60] inline-flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-full bg-white/90 hover:bg-white border-2 border-pink-300 hover:border-pink-400 transition-all duration-300 text-xs sm:text-sm font-medium text-gray-700 h-[44px] min-w-[44px] cursor-pointer touch-manipulation flex-shrink-0 shadow-sm hover:shadow-md relative z-[100]" 
        aria-label="Change language"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="text-lg sm:text-xl flex-shrink-0 leading-none">{currentLanguage.flag}</span>
        <span className="hidden sm:inline whitespace-nowrap">{currentLanguage.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[10px] sm:text-xs flex-shrink-0 ml-0.5"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-pink-200 overflow-hidden min-w-[140px] sm:min-w-[160px] w-max whitespace-nowrap z-[9999]"
            style={{ 
              position: 'absolute', 
              zIndex: 9999, 
              backgroundColor: 'white',
              isolation: 'isolate'
            }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 sm:py-3.5 flex items-center gap-2 sm:gap-2.5 hover:bg-pink-50 transition-colors text-left cursor-pointer min-h-[44px] touch-manipulation ${
                  locale === lang.code ? 'bg-pink-50 font-semibold' : ''
                }`}
                type="button"
              >
                <span className="text-base sm:text-lg">{lang.flag}</span>
                <span className="text-sm sm:text-base">{lang.name}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-rose-600 text-base sm:text-lg">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
