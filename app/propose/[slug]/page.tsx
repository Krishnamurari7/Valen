'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Proposal } from '@/lib/database.types'
import ShareButtons from '@/components/ShareButtons'
import { use } from 'react'
import { useTranslations } from '@/lib/i18n'

const themeStyles = {
  romantic: {
    gradient: 'from-rose-600 via-red-500 to-pink-600',
    bgGradient: 'from-rose-100 via-pink-50 to-red-100',
    accent: '#E63946',
    particles: ['❤️', '🌹', '💖', '✨'],
  },
  cute: {
    gradient: 'from-pink-400 via-rose-300 to-fuchsia-400',
    bgGradient: 'from-pink-100 via-fuchsia-50 to-purple-100',
    accent: '#FF69B4',
    particles: ['💕', '🦋', '🌸', '💗'],
  },
  funny: {
    gradient: 'from-amber-400 via-orange-400 to-pink-400',
    bgGradient: 'from-amber-100 via-orange-50 to-pink-100',
    accent: '#FF6B35',
    particles: ['😜', '🎉', '💛', '✨'],
  },
}

function fireConfetti() {
  const duration = 5000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#E63946', '#FFB6C1', '#FF69B4', '#FFD700'],
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#E63946', '#FFB6C1', '#FF69B4', '#FFD700'],
    })
  }, 250)
}

export default function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const t = useTranslations('proposalPage')
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState<'yes' | 'no' | null>(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [dodgeCount, setDodgeCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProposal() {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('slug', resolvedParams.slug)
        .single()

      if (error) {
        console.error('Error fetching proposal:', error)
      } else {
        setProposal(data)
        if (data.response) {
          setResponse(data.response as 'yes' | 'no')
        }
        
        // Track view count (increment on each view)
        if (data.id) {
          const currentViewCount = data.view_count || 0
          try {
            const { error: updateError } = await supabase
              .from('proposals')
              .update({ view_count: currentViewCount + 1 })
              .eq('id', data.id)
            
            if (!updateError) {
              // Update local state with new count
              setProposal(prev => prev ? { ...prev, view_count: currentViewCount + 1 } : null)
            } else {
              console.error('Error updating view count:', updateError)
              // Non-critical error, continue
            }
          } catch (err) {
            console.error('Error updating view count:', err)
            // Non-critical error, continue
          }
        }
      }
      setLoading(false)
    }

    fetchProposal()
  }, [resolvedParams.slug])

  const handleYes = async () => {
    setResponse('yes')
    fireConfetti()

    if (proposal) {
      await supabase
        .from('proposals')
        .update({ response: 'yes' })
        .eq('id', proposal.id)
    }
  }

  const dodgeNoButton = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const buttonWidth = 120
    const buttonHeight = 50
    const maxX = container.width - buttonWidth - 20
    const maxY = 200 // Limit vertical movement

    // Increase randomness with each dodge
    const randomX = Math.random() * maxX - maxX / 2
    const randomY = Math.random() * maxY - maxY / 2

    setNoButtonPosition({ x: randomX, y: randomY })
    setDodgeCount(prev => prev + 1)
  }, [])

  const handleNoHover = () => {
    if (dodgeCount < 10) { // After 10 dodges, let them click if they really want
      dodgeNoButton()
    }
  }

  const handleNoClick = async () => {
    if (dodgeCount >= 10) {
      setResponse('no')
      if (proposal) {
        await supabase
          .from('proposals')
          .update({ response: 'no' })
          .eq('id', proposal.id)
      }
    } else {
      dodgeNoButton()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="text-6xl"
        >
          💝
        </motion.div>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-8 text-center max-w-md">
          <span className="text-6xl block mb-4">💔</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-4 font-[family-name:var(--font-display)]">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('notFound.description')}
          </p>
          <a href="/" className="btn-primary inline-block">
            {t('notFound.goHome')}
          </a>
        </div>
      </div>
    )
  }

  const theme = themeStyles[proposal.theme as keyof typeof themeStyles] || themeStyles.romantic

  // Already responded
  if (response === 'yes' || proposal.response === 'yes') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center px-4 py-8 sm:py-12`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 sm:p-8 text-center max-w-lg w-full mx-2 sm:mx-0"
        >
          <motion.span
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl block mb-4 sm:mb-6"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💕
          </motion.span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 font-[family-name:var(--font-display)] px-2">
            {t('success.title')}
          </h1>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-2">
            {t('success.description', { yourName: proposal.your_name, partnerName: proposal.partner_name })}
          </p>
          <div className="bg-pink-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-500">{t('success.share')}</p>
          </div>
          <ShareButtons
            text={`${proposal.partner_name} said YES! 💕 ${proposal.your_name} and ${proposal.partner_name} are now Valentines!`}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title="Valentine Proposal - They Said Yes!"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} flex items-center justify-center px-4 py-8 sm:py-12 overflow-hidden`}
    >
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {theme.particles.map((particle, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl sm:text-3xl opacity-30"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            animate={{
              y: -100,
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
          >
            {particle}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-8 max-w-lg w-full text-center relative z-10 mx-2 sm:mx-0"
      >
        {/* Image */}
        {proposal.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 sm:mb-6 relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto"
          >
            <Image
              src={proposal.image_url}
              alt={`Proposal from ${proposal.your_name} to ${proposal.partner_name}`}
              fill
              className="object-cover rounded-full border-4 border-white shadow-xl"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              priority
            />
          </motion.div>
        )}

        {/* Main Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 font-[family-name:var(--font-display)] bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent px-2 leading-tight`}>
            {t('question', { partnerName: proposal.partner_name })}
          </h1>
          
          <p className="text-gray-600 mb-2 text-xs sm:text-sm md:text-base">
            {t('from')} <span className="font-semibold text-rose-600">{proposal.your_name}</span>
          </p>

          {proposal.message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-700 italic mt-2 sm:mt-3 md:mt-4 mb-3 sm:mb-4 md:mb-6 bg-pink-50 rounded-xl p-2.5 sm:p-3 md:p-4 border border-pink-200 text-xs sm:text-sm md:text-base leading-relaxed"
            >
              &ldquo;{proposal.message}&rdquo;
            </motion.p>
          )}
        </motion.div>

        {/* Response Buttons */}
        <AnimatePresence>
          {!response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center mt-4 sm:mt-6 md:mt-8 relative"
              style={{ minHeight: '80px' }}
            >
              {/* YES Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full shadow-lg shadow-rose-500/40 hover:shadow-xl hover:shadow-rose-500/50 active:shadow-xl active:shadow-rose-500/50 transition-all z-10 min-h-[48px] sm:min-h-[52px] w-full sm:w-auto touch-manipulation"
              >
                {t('yesButton')}
              </motion.button>

              {/* NO Button (Dodging) */}
              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoClick}
                className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gray-300 text-gray-700 font-bold text-base sm:text-lg md:text-xl rounded-full hover:bg-gray-400 active:bg-gray-400 transition-colors dodge-button min-h-[48px] sm:min-h-[52px] w-full sm:w-auto touch-manipulation"
              >
                {t('noButton')}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dodge Counter */}
        {dodgeCount > 0 && dodgeCount < 10 && !response && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 md:mt-4 px-2 text-center"
          >
            {dodgeCount < 3 && t('dodgeMessages.shy')}
            {dodgeCount >= 3 && dodgeCount < 6 && t('dodgeMessages.comeOn')}
            {dodgeCount >= 6 && dodgeCount < 10 && t('dodgeMessages.almost')}
          </motion.p>
        )}

        {dodgeCount >= 10 && !response && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 md:mt-4 px-2 text-center"
          >
            {t('dodgeMessages.okay')}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
