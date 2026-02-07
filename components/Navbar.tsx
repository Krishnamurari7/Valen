'use client'

import Link from 'next/link'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('common')
  const navRef = useRef<HTMLElement>(null)

  // Ensure mobile menu is closed on mount/refresh - use useLayoutEffect for immediate effect
  useLayoutEffect(() => {
    setIsOpen(false)
    setMounted(true)
  }, [])

  // Also ensure it's closed after hydration
  useEffect(() => {
    setIsOpen(false)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
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

  const navLinks = [
    { href: '/', label: t('home'), icon: '🏠' },
    { href: '/love-message', label: t('loveMessages'), icon: '💌' },
    { href: '/propose', label: t('propose'), icon: '💍' },
    { href: '/compatibility', label: t('compatibility'), icon: '💕' },
  ]

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-pink-100/50 shadow-sm relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 via-transparent to-pink-50/30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 md:gap-3 group relative min-h-[44px] touch-manipulation">
            <motion.span 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl filter drop-shadow-md relative z-10"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              💝
            </motion.span>
            <motion.span 
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gradient font-[family-name:var(--font-display)] relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('appName')}
            </motion.span>
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-pink-500/0 group-hover:from-rose-500/10 group-hover:to-pink-500/10 rounded-full blur-xl transition-all duration-300 -z-10"></div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-5 py-2 lg:py-2.5 rounded-full text-gray-700 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-300 flex items-center gap-1.5 lg:gap-2 font-medium text-xs lg:text-sm relative group"
              >
                <motion.span
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ type: 'spring', stiffness: 400, duration: 0.5 }}
                  className="relative z-10"
                >
                  {link.icon}
                </motion.span>
                <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">{link.label}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/0 to-pink-500/0 group-hover:from-rose-500/10 group-hover:to-pink-500/10 transition-all duration-300"></span>
                {/* Active indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300"
                  layoutId="navbar-indicator"
                />
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 sm:p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 active:bg-gradient-to-r active:from-rose-50 active:to-pink-50 transition-all duration-300 relative min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Toggle menu"
              type="button"
            >
            <motion.div
              animate={isOpen ? 'open' : 'closed'}
              className="w-6 sm:w-7 h-5 sm:h-6 flex flex-col justify-between relative z-10"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0, opacity: 1 },
                  open: { rotate: 45, y: 9, opacity: 1 },
                }}
                className="w-full h-0.5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full block origin-center"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, x: 0 },
                  open: { opacity: 0, x: -10 },
                }}
                className="w-full h-0.5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full block"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0, opacity: 1 },
                  open: { rotate: -45, y: -9, opacity: 1 },
                }}
                className="w-full h-0.5 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full block origin-center"
              />
            </motion.div>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-b border-pink-100/50 shadow-lg"
          >
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-gray-700 hover:text-rose-600 active:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 active:bg-gradient-to-r active:from-rose-50 active:to-pink-50 transition-all duration-300 font-medium group min-h-[44px] touch-manipulation text-sm sm:text-base"
                  >
                    <motion.span 
                      className="text-xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {link.icon}
                    </motion.span>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
