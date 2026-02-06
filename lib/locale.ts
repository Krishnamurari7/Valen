'use client'

import { useEffect, useState } from 'react'

const locales = ['en', 'hi'] as const
export type Locale = typeof locales[number]

function getCookieLocale(): Locale {
  if (typeof document === 'undefined') return 'en'
  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find(c => c.trim().startsWith('locale='))
  if (localeCookie) {
    const locale = localeCookie.split('=')[1].trim()
    if (locales.includes(locale as Locale)) {
      return locale as Locale
    }
  }
  return 'en'
}

function setCookieLocale(locale: Locale) {
  if (typeof document === 'undefined') return
  // Set cookie with proper attributes
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  document.cookie = `locale=${locale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
}

export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en' // Default for SSR
  }
  return getCookieLocale()
}

export function useLocale(): [Locale, (locale: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en'
    return getCookieLocale()
  })

  useEffect(() => {
    // Read locale from cookie on mount and when cookie changes
    const updateLocale = () => {
      const currentLocale = getCookieLocale()
      setLocaleState(currentLocale)
    }
    
    updateLocale()
    
    // Listen for locale changes
    const handleLocaleChange = () => {
      updateLocale()
    }
    
    window.addEventListener('localechange', handleLocaleChange)
    
    // Also check periodically in case cookie was set by another tab/window
    const interval = setInterval(updateLocale, 1000)
    
    return () => {
      window.removeEventListener('localechange', handleLocaleChange)
      clearInterval(interval)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setCookieLocale(newLocale)
    // Trigger a re-render by updating state
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('localechange'))
    }
  }

  return [locale, setLocale]
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return path // Keep same path, locale is stored in cookie
}
