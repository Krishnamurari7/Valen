'use client'

import ProposalForm from '@/components/ProposalForm'
import { useTranslations } from '@/lib/i18n'

export default function ProposePage() {
  const t = useTranslations('propose')
  
  return (
    <div className="min-h-screen py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl block mb-2 sm:mb-3 md:mb-4">💍</span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 font-[family-name:var(--font-display)] px-2 leading-tight">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <ProposalForm />

        {/* How it Works */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center text-gray-800 font-[family-name:var(--font-display)] px-2">
            {t('howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { step: '1', icon: '✏️', title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
              { step: '2', icon: '🎨', title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
              { step: '3', icon: '📸', title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
              { step: '4', icon: '🔗', title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
            ].map((item) => (
              <div key={item.step} className="glass-card p-4 sm:p-5 md:p-6 text-center relative">
                <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  {item.step}
                </div>
                <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">{item.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Feature */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 glass-card p-4 sm:p-6 md:p-8 text-center bg-gradient-to-r from-pink-50 to-rose-50">
          <span className="text-2xl sm:text-3xl md:text-4xl block mb-2 sm:mb-3 md:mb-4">😅</span>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)] px-2">
            {t('funFeature.title')}
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-sm md:text-base px-2">
            {t('funFeature.description')}
          </p>
        </div>
      </div>
    </div>
  )
}