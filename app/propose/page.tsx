'use client'

import ProposalForm from '@/components/ProposalForm'
import { useTranslations } from '@/lib/i18n'

export default function ProposePage() {
  const t = useTranslations('propose')
  
  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <span className="text-4xl sm:text-5xl md:text-6xl block mb-3 sm:mb-4">💍</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-[family-name:var(--font-display)] px-2">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto px-2">
            {t('description')}
          </p>
        </div>

        {/* Form */}
        <ProposalForm />

        {/* How it Works */}
        <div className="mt-12 sm:mt-14 md:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-gray-800 font-[family-name:var(--font-display)] px-2">
            {t('howItWorks.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <div className="mt-12 sm:mt-14 md:mt-16 glass-card p-6 sm:p-8 text-center bg-gradient-to-r from-pink-50 to-rose-50">
          <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">😅</span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 font-[family-name:var(--font-display)] px-2">
            {t('funFeature.title')}
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base px-2">
            {t('funFeature.description')}
          </p>
        </div>
      </div>
    </div>
  )
}
