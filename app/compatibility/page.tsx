'use client'

import CompatibilityForm from '@/components/CompatibilityForm'
import { useTranslations } from '@/lib/i18n'

export default function CompatibilityPage() {
  const t = useTranslations('compatibility')
  
  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-4xl sm:text-5xl md:text-6xl block mb-3 sm:mb-4">💕</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-[family-name:var(--font-display)] px-2">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <CompatibilityForm />

        {/* Info Cards */}
        <div className="mt-12 sm:mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="glass-card p-4 sm:p-5 md:p-6">
            <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">🔮</span>
            <h3 className="font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)] text-base sm:text-lg">
              {t('howItWorks.title')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {t('howItWorks.description')}
            </p>
          </div>
          <div className="glass-card p-4 sm:p-5 md:p-6">
            <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">📥</span>
            <h3 className="font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)] text-base sm:text-lg">
              {t('shareResults.title')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {t('shareResults.description')}
            </p>
          </div>
        </div>

        {/* Compatibility Levels */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800 font-[family-name:var(--font-display)] px-2">
            {t('levelsTitle')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {[
              { range: '90-100%', label: t('levels.perfect'), emoji: '💖', color: '#E63946' },
              { range: '75-89%', label: t('levels.great'), emoji: '💗', color: '#FF6B8A' },
              { range: '50-74%', label: t('levels.good'), emoji: '💓', color: '#FFB6C1' },
              { range: '25-49%', label: t('levels.mixed'), emoji: '💔', color: '#FFD93D' },
              { range: '0-24%', label: t('levels.low'), emoji: '🤝', color: '#95C8FF' },
            ].map((level) => (
              <div 
                key={level.range} 
                className="glass-card p-3 sm:p-4 text-center"
                style={{ borderColor: level.color, borderWidth: 2 }}
              >
                <span className="text-xl sm:text-2xl block mb-1 sm:mb-2">{level.emoji}</span>
                <div className="font-bold text-xs sm:text-sm" style={{ color: level.color }}>
                  {level.range}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600">{level.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}