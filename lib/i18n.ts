'use client'

import { useLocale } from './locale'
import { useEffect, useState } from 'react'

type Messages = typeof import('@/messages/en.json')

export function useTranslations(namespace?: keyof Messages) {
  const [locale] = useLocale()
  const [messages, setMessages] = useState<Messages | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    // Dynamically import messages
    import(`@/messages/${locale}.json`)
      .then((mod) => {
        setMessages(mod.default as Messages)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(`Failed to load locale ${locale}:`, err)
        // Fallback to English if locale file doesn't exist
        import('@/messages/en.json')
          .then((mod) => {
            setMessages(mod.default as Messages)
            setIsLoading(false)
          })
          .catch((err) => {
            console.error('Failed to load fallback locale:', err)
            setIsLoading(false)
          })
      })
  }, [locale])
  
  return function t(key: string, params?: Record<string, string | number>) {
    if (!messages) return key // Return key while loading
    
    let value: any = messages
    const keys = namespace ? [namespace, ...key.split('.')] : key.split('.')
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value]
      } else {
        return key // Return key if translation not found
      }
    }
    
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }
    
    return value || key
  }
}

export function getTranslations(namespace?: keyof Messages) {
  return useTranslations(namespace)
}
