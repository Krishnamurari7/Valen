'use client'

import LoveMessageForm from '@/components/LoveMessageForm'
import PromotionBanner from '@/components/PromotionBanner'
import { useTranslations } from '@/lib/i18n'

export default function LoveMessagePage() {
  const t = useTranslations('loveMessage')
  
  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mb-2 sm:mb-3 md:mb-4">💌</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 font-[family-name:var(--font-display)] px-2 leading-tight">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <LoveMessageForm />

        {/* Promotion Banner */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <PromotionBanner variant="full" />
        </div>

        {/* Tips Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-800 font-[family-name:var(--font-display)] px-2">
            {t('tips.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: '🌹', title: t('tips.tip1.title'), tip: t('tips.tip1.description') },
              { icon: '✨', title: t('tips.tip2.title'), tip: t('tips.tip2.description') },
              { icon: '📱', title: t('tips.tip3.title'), tip: t('tips.tip3.description') },
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-4 sm:p-5 md:p-6">
                <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">{item.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}