'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase, getImageUrl } from '@/lib/supabase'
import { generateSlug } from '@/lib/utils'
import type { Theme } from '@/lib/database.types'
import { useTranslations } from '@/lib/i18n'

export default function ProposalForm() {
  const t = useTranslations('propose')
  
  // Ensure translations are loaded
  if (!t || typeof t !== 'function') {
    return (
      <div className="glass-card p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">💍</div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }
  
  const themes: { value: Theme; label: string; icon: string; description: string }[] = [
    { value: 'romantic', label: t('themes.romantic.label'), icon: '🌹', description: t('themes.romantic.description') },
    { value: 'cute', label: t('themes.cute.label'), icon: '🦋', description: t('themes.cute.description') },
    { value: 'funny', label: t('themes.funny.label'), icon: '😜', description: t('themes.funny.description') },
  ]
  const router = useRouter()
  const [yourName, setYourName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<Theme>('romantic')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [createdUrl, setCreatedUrl] = useState('')
  const [error, setError] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t('errors.imageSize'))
        return
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError(t('errors.imageType'))
        return
      }
      setImage(file)
      setError('')
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!yourName.trim() || !partnerName.trim()) return

    setIsSubmitting(true)
    setError('')
    setUploadProgress(0)

    try {
      // Generate slug and check for collisions
      let slug = generateSlug(yourName, partnerName)
      let attempts = 0
      const maxAttempts = 5
      
      while (attempts < maxAttempts) {
        const { data: existing } = await supabase
          .from('proposals')
          .select('id')
          .eq('slug', slug)
          .single()
        
        if (!existing) {
          break // Slug is available
        }
        
        // Generate new slug with different timestamp
        slug = generateSlug(yourName, partnerName)
        attempts++
      }
      
      if (attempts >= maxAttempts) {
        throw new Error('Unable to generate unique slug. Please try again.')
      }

      let imageUrl: string | null = null

      // Upload image if provided with progress tracking
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${slug}.${fileExt}`
        
        setUploadProgress(10)
        
        // Simulate progress for better UX (Supabase doesn't provide native progress)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return prev
            }
            return prev + 10
          })
        }, 200)
        
        const { error: uploadError } = await supabase.storage
          .from('proposal-images')
          .upload(fileName, image, { upsert: true })

        clearInterval(progressInterval)
        setUploadProgress(100)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          setError(t('errors.imageUploadFailed') || 'Failed to upload image. Please try again.')
          setIsSubmitting(false)
          return
        } else {
          imageUrl = getImageUrl(fileName)
        }
      }

      setUploadProgress(100)

      // Create proposal in database
      const { error: insertError } = await supabase
        .from('proposals')
        .insert({
          slug,
          your_name: yourName.trim(),
          partner_name: partnerName.trim(),
          message: message.trim() || null,
          theme,
          image_url: imageUrl,
        })

      if (insertError) {
        throw insertError
      }

      const proposalUrl = `${window.location.origin}/propose/${slug}`
      setCreatedUrl(proposalUrl)
    } catch (err) {
      console.error('Error creating proposal:', err)
      setError(t('errors.createFailed'))
      setUploadProgress(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(createdUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  if (createdUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="glass-card p-6 sm:p-8 md:p-10 text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto relative overflow-hidden"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-transparent pointer-events-none"></div>
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl relative z-10"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 font-[family-name:var(--font-display)] relative z-10 px-2">
          {t('created.title')}
        </h2>
        <p className="text-gray-700 text-base sm:text-lg relative z-10 px-2">
          {t('created.description', { partnerName })}
        </p>
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-rose-200/50 shadow-lg relative z-10 overflow-hidden mx-2 sm:mx-0"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-24 h-24 bg-rose-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-400 rounded-full blur-2xl"></div>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium relative z-10">{t('created.linkLabel')}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-rose-700 font-semibold break-all text-xs sm:text-sm md:text-base bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-rose-200/50 relative z-10 hover:bg-white/90 transition-colors cursor-pointer"
            onClick={handleCopyUrl}
            title="Click to copy"
          >
            {createdUrl}
          </motion.p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center relative z-10 px-2 sm:px-0">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyUrl}
            className={`btn-primary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2 min-h-[44px] touch-manipulation text-sm sm:text-base ${
              copied ? 'bg-gradient-to-r from-green-500 to-green-600' : ''
            }`}
          >
            {copied ? (
              <>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  ✓
                </motion.span>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>{t('created.copyLink')}</span>
              </>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(createdUrl.replace(window.location.origin, ''))}
            className="btn-secondary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center gap-1.5 sm:gap-2 min-h-[44px] touch-manipulation text-sm sm:text-base"
          >
            <span>👀</span>
            <span>{t('created.preview')}</span>
          </motion.button>
        </div>

        <button
          onClick={() => {
            setCreatedUrl('')
            setYourName('')
            setPartnerName('')
            setMessage('')
            setImage(null)
            setImagePreview('')
          }}
          className="text-gray-600 hover:text-rose-600 transition-colors text-sm md:text-base font-medium relative z-10"
        >
          {t('created.createAnother')}
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 max-w-2xl mx-auto"
    >
      {/* Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div>
          <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg">💫</span>
            <span>{t('yourName')}</span>
          </label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            placeholder={t('yourName')}
            maxLength={30}
            required
            className="input-romantic text-base sm:text-lg"
          />
        </div>
        <div>
          <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg">💝</span>
            <span>{t('partnerName')}</span>
          </label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder={t('partnerName')}
            maxLength={30}
            required
            className="input-romantic text-base sm:text-lg"
          />
        </div>
      </div>

      {/* Custom Message */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
          <span>💌</span>
          <span>{t('customMessage')}</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('customMessagePlaceholder')}
          maxLength={200}
          rows={4}
          className="input-romantic resize-none"
        />
        <p className="text-xs text-gray-500 mt-2 text-right font-medium">{message.length}/200</p>
      </div>

      {/* Theme Selection */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
          <span>✨</span>
          <span>{t('chooseTheme')}</span>
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          {themes.map((t) => (
            <motion.button
              key={t.value}
              type="button"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(t.value)}
              className={`p-2.5 sm:p-3 md:p-4 lg:p-5 rounded-xl sm:rounded-2xl border-2 transition-all text-center relative overflow-hidden min-h-[100px] sm:min-h-[120px] md:min-h-[140px] touch-manipulation ${
                theme === t.value
                  ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl'
                  : 'border-pink-200 bg-white hover:border-pink-400 hover:bg-pink-50/50 active:border-pink-400 active:bg-pink-50/50'
              }`}
            >
              {theme === t.value && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
              <span className="text-2xl sm:text-3xl block mb-1 sm:mb-2 relative z-10">{t.icon}</span>
              <span className={`text-xs sm:text-sm font-bold block mb-0.5 sm:mb-1 relative z-10 ${theme === t.value ? 'text-rose-700' : 'text-gray-800'}`}>
                {t.label}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-600 relative z-10">{t.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
          <span>📸</span>
          <span>{t('uploadPhoto')}</span>
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-36 sm:h-40 md:h-48 border-2 border-dashed border-pink-300 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gradient-to-br hover:from-pink-50 hover:to-rose-50 active:bg-gradient-to-br active:from-pink-50 active:to-rose-50 transition-all duration-300 hover:border-pink-400 active:border-pink-400 group relative overflow-hidden min-h-[144px] sm:min-h-[160px] touch-manipulation"
          >
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/0 to-rose-100/0 group-hover:from-pink-100/50 group-hover:to-rose-100/50 transition-all duration-300"></div>
            
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl relative z-10"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
              </>
            ) : (
              <>
                <motion.span
                  className="text-4xl sm:text-5xl mb-2 sm:mb-3 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  📷
                </motion.span>
                <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-1 relative z-10 text-center px-2">{t('uploadHint')}</span>
                <span className="text-[10px] sm:text-xs text-gray-500 relative z-10">JPG, PNG</span>
              </>
            )}
          </label>
          {imagePreview && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => {
                setImage(null)
                setImagePreview('')
              }}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 shadow-lg hover:scale-110 transition-all font-bold text-lg"
            >
              ×
            </motion.button>
          )}
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
        >
          <p className="text-red-600 text-sm md:text-base text-center font-medium">
            {error}
          </p>
        </motion.div>
      )}

      {/* Upload Progress Indicator */}
      {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{image ? 'Uploading image...' : 'Creating proposal...'}</span>
            <span className="font-semibold">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={!yourName.trim() || !partnerName.trim() || isSubmitting}
        className="btn-primary w-full text-sm sm:text-base md:text-lg lg:text-xl py-2.5 sm:py-3 md:py-4 lg:py-5 font-semibold min-h-[44px] touch-manipulation"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2 sm:gap-3">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-lg sm:text-xl"
            >
              💖
            </motion.span>
            <span>{t('creating')}</span>
          </span>
        ) : (
          <span>{t('createButton')}</span>
        )}
      </motion.button>
    </motion.form>
  )
}
