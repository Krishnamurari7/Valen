'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from '@/lib/i18n'
import Script from 'next/script'

export default function Home() {
  const t = useTranslations('home')
  
  const baseUrl = 'https://dripxthing.in'
  
  // Structured data for home page features
  const homePageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Valentine All-in-One Features',
    description: 'Complete Valentine\'s Day toolkit with love message generator, proposal creator, and compatibility calculator',
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        position: 1,
        name: 'Love Message Generator',
        description: 'Create personalized romantic messages with just a few clicks',
        url: `${baseUrl}/love-message`,
        applicationCategory: 'EntertainmentApplication',
      },
      {
        '@type': 'SoftwareApplication',
        position: 2,
        name: 'Proposal Page Creator',
        description: 'Create a beautiful, shareable proposal page with a unique URL',
        url: `${baseUrl}/propose`,
        applicationCategory: 'EntertainmentApplication',
      },
      {
        '@type': 'SoftwareApplication',
        position: 3,
        name: 'Love Compatibility Calculator',
        description: 'Calculate your compatibility percentage with your special someone',
        url: `${baseUrl}/compatibility`,
        applicationCategory: 'EntertainmentApplication',
      },
    ],
  }
  
  const features = [
    {
      href: '/love-message',
      icon: '💌',
      title: t('feature1.title'),
      description: t('feature1.description'),
      gradient: 'from-rose-500 to-pink-500',
      delay: 0.1,
    },
    {
      href: '/propose',
      icon: '💍',
      title: t('feature2.title'),
      description: t('feature2.description'),
      gradient: 'from-pink-500 to-fuchsia-500',
      delay: 0.2,
    },
    {
      href: '/compatibility',
      icon: '💕',
      title: t('feature3.title'),
      description: t('feature3.description'),
      gradient: 'from-fuchsia-500 to-purple-500',
      delay: 0.3,
    },
  ]
  return (
    <>
      <Script
        id="home-page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Sparkle effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-rose-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl block mb-3 sm:mb-4 md:mb-6 lg:mb-8 filter drop-shadow-lg"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            >
              💝
            </motion.span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-[family-name:var(--font-display)] leading-tight px-2">
              <motion.span 
                className="text-gradient block mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t('title').split(' ')[0]}
              </motion.span>
              <motion.span 
                className="text-gray-800 block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('title').split(' ').slice(1).join(' ')}
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-5 sm:mb-6 md:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed font-medium px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 justify-center px-4"
            >
              <Link href="/love-message" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 w-full sm:w-auto min-h-[44px] touch-manipulation"
                >
                  {t('startNow')}
                </motion.button>
              </Link>
              <Link href="/compatibility" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 w-full sm:w-auto min-h-[44px] touch-manipulation"
                >
                  {t('checkCompatibility')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Decorative Elements */}
        <motion.div 
          className="absolute top-10 sm:top-20 left-4 sm:left-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 sm:opacity-25"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🌹
        </motion.div>
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 sm:opacity-25"
          animate={{ 
            y: [0, -25, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-4 sm:right-20 text-3xl sm:text-4xl md:text-5xl opacity-15 sm:opacity-20 hidden sm:block"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 20, -20, 0]
          }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          💖
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-4 sm:left-20 text-3xl sm:text-4xl md:text-5xl opacity-15 sm:opacity-20 hidden md:block"
          animate={{ 
            y: [0, -18, 0],
            rotate: [0, -25, 25, 0]
          }}
          transition={{ 
            duration: 4.5, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          💕
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 font-[family-name:var(--font-display)] text-gray-800 px-2"
          >
            {t('featuresTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: feature.delay, duration: 0.6 }}
              >
                <Link href={feature.href}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="glass-card p-6 sm:p-8 md:p-10 h-full cursor-pointer group relative overflow-hidden"
                  >
                    {/* Enhanced gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </div>
                    
                    <motion.span
                      className="text-6xl block mb-6 relative z-10 filter drop-shadow-lg"
                      whileHover={{ scale: 1.25, rotate: [0, 15, -15, 0] }}
                      transition={{ type: 'spring', stiffness: 300, duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.span>
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent relative z-10 group-hover:scale-105 transition-transform duration-300`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6 relative z-10 text-base group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-rose-600 font-semibold group-hover:text-rose-700 transition-colors relative z-10">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{t('tryItNow')}</span>
                      <motion.span 
                        className="ml-2 text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 via-transparent to-fuchsia-600/20"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-center text-white"
          >
            {[
              { value: '100+', label: t('stats.messageTemplates'), icon: '💌' },
              { value: '∞', label: t('stats.proposalsCreated'), icon: '💍' },
              { value: '💯', label: t('stats.compatibilityTests'), icon: '💕' },
              { value: '💕', label: t('stats.heartsConnected'), icon: '💖' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, type: 'spring' }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass-card bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl"
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-95 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl block mb-4 sm:mb-6 md:mb-8"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💝
            </motion.span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 font-[family-name:var(--font-display)] text-gray-800 px-2">
              {t('ctaTitle')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-5 sm:mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              {t('ctaDescription')}
            </p>
            <Link href="/propose" className="inline-block w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm sm:text-base md:text-lg lg:text-xl px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 animate-pulse-glow relative overflow-hidden w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('ctaButton')}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Web Development Promotion Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-center mb-6"
              >
                <span className="text-5xl sm:text-6xl md:text-7xl block mb-4">🚀</span>
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 font-[family-name:var(--font-display)] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('promotion.title')}
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-700 text-center mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                {t('promotion.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.a
                  href="https://codehubpro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 min-h-[44px] touch-manipulation flex items-center gap-2"
                >
                  <span>🌐</span>
                  <span>{t('promotion.visitWebsite')}</span>
                </motion.a>
                
                <motion.a
                  href={`tel:7488684917`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4 min-h-[44px] touch-manipulation flex items-center gap-2"
                >
                  <span>📞</span>
                  <span>{t('promotion.callUs')}: 7488684917</span>
                </motion.a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50"
                >
                  <div className="text-3xl mb-2">💻</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-800">{t('promotion.feature1')}</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50"
                >
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-800">{t('promotion.feature2')}</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50"
                >
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-sm sm:text-base font-semibold text-gray-800">{t('promotion.feature3')}</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}
