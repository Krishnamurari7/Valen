'use client'

import LoveMessageForm from '@/components/LoveMessageForm'
import { useTranslations } from '@/lib/i18n'

export default function LoveMessagePage() {
  const t = useTranslations('loveMessage')
  
  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-4xl sm:text-5xl md:text-6xl block mb-3 sm:mb-4">💌</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-[family-name:var(--font-display)] px-2">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <LoveMessageForm />

        {/* Tips Section */}
        <div className="mt-12 sm:mt-14 md:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 font-[family-name:var(--font-display)] px-2">
            {t('tips.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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
