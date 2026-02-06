'use client'

import { useLocale } from '@/lib/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
]

export default function LanguageSwitcher() {
  const [locale, setLocale] = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} className="relative z-[60]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-white border border-pink-200 hover:border-pink-400 transition-all duration-300 text-sm font-medium text-gray-700 min-h-[44px] cursor-pointer"
        aria-label="Change language"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
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
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-pink-200 overflow-hidden z-[101] min-w-[140px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 flex items-center gap-2 hover:bg-pink-50 transition-colors text-left cursor-pointer ${
                  locale === lang.code ? 'bg-pink-50 font-semibold' : ''
                }`}
                type="button"
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-rose-600">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
