Valentine All-in-One Platform - Product Requirements Document
Version: 1.1
Last Updated: January 2025
Document Owner: Product & Engineering Team

📋 Executive Summary
Valentine All-in-One is a viral, mobile-first web application designed to help users celebrate Valentine's Day through three core features: personalized love message generation, custom proposal page creation, and playful compatibility calculations. Built for maximum shareability and engagement, the platform targets couples, singles, and students seeking creative ways to express affection.

🎯 Product Vision & Goals
Vision Statement
Create the go-to digital destination for Valentine's Day expressions, combining personalization, entertainment, and social sharing in a seamless, delightful experience.
Primary Objectives

Virality: Design shareable experiences that encourage organic growth
Accessibility: Provide a simple, mobile-first interface requiring no technical knowledge
Emotional Impact: Deliver meaningful, personalized romantic content
Performance: Ensure sub-2-second load times across all devices

Success Metrics

100K+ unique visitors in first Valentine's season
40%+ share rate on generated content
70%+ mobile traffic
Average session duration >3 minutes


👥 Target Audience
Primary Users

Young Couples (18-30): Seeking creative ways to express feelings
Students (16-25): Looking for fun, shareable romantic content
Singles: Exploring compatibility with crushes or for entertainment

User Needs

Quick, hassle-free content generation
Professional-looking, shareable outputs
Mobile accessibility
Privacy (no login required for basic features)


⚙️ Technical Architecture
Technology Stack
| Layer | Technology | Version | Justification |
|-------|-----------|---------|---------------|
| Frontend Framework | Next.js (App Router) | 16.1.6+ | Server-side rendering, optimal SEO, modern React patterns |
| Runtime | React | 19.2.3+ | Latest React with concurrent features |
| Language | TypeScript | 5+ | Type safety, better developer experience |
| Styling | Tailwind CSS | 4+ | Rapid UI development, consistency, small bundle size |
| Animations | Framer Motion | 12.33.0+ | Smooth, performant animations with simple API |
| Utilities | clsx | 2.1.1+ | Conditional class name utility |
| Backend | Supabase | 2.95.2+ | Real-time database, authentication, file storage |
| Hosting | Vercel | - | Seamless Next.js integration, global CDN, zero config |
| Image Optimization | Next/Image | Built-in | Automatic optimization, lazy loading, modern formats |
| Confetti | canvas-confetti | 1.9.4+ | Celebration animations for proposal pages |
| Image Export | html-to-image | 1.11.13+ | Convert HTML to images for sharing compatibility results |
Project Structure
valen/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── layout.tsx                    # Root layout with metadata
│   ├── globals.css                   # Global styles
│   ├── favicon.ico                   # Site favicon
│   ├── love-message/
│   │   └── page.tsx                  # Message generator
│   ├── propose/
│   │   ├── page.tsx                  # Proposal creation
│   │   └── [slug]/page.tsx           # Dynamic proposal pages
│   └── compatibility/
│       └── page.tsx                  # Compatibility calculator
├── components/
│   ├── Navbar.tsx                    # Site navigation
│   ├── Footer.tsx                    # Footer with links
│   ├── LoveMessageForm.tsx           # Message input form
│   ├── ProposalForm.tsx              # Proposal creation form
│   ├── CompatibilityForm.tsx         # Compatibility input
│   ├── ShareButtons.tsx              # Social sharing component
│   └── FloatingHearts.tsx            # Animated floating hearts/emojis
├── lib/
│   ├── messages.ts                   # Message templates
│   ├── compatibility.ts              # Compatibility logic
│   ├── utils.ts                      # Shared utilities
│   ├── supabase.ts                   # Supabase client configuration
│   └── database.types.ts             # Generated database types
├── public/
│   └── images/                       # Static assets
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── eslint.config.mjs                 # ESLint configuration
├── postcss.config.mjs                # PostCSS configuration
└── README.md                         # Project documentation

Note: API routes are implemented as server actions or client-side functions rather than separate API route handlers for better performance and simpler architecture.

🎨 Feature Specifications
Feature 1: Love Message Generator
Purpose: Generate personalized romantic messages with one click
User Flow:

User enters their name and partner's name
User selects mood (Romantic / Cute / Funny / Emotional)
User clicks "Generate Message"
System displays animated message card
User can copy or share via WhatsApp/Instagram

UI Components:

Input fields with validation
Mood selector (icon + label buttons)
Primary CTA button with hover effects
Animated message reveal
Copy button with success feedback
Social share buttons

Technical Requirements:

- Template library with 20+ messages per mood category
- Name placeholder replacement using template literals
- Randomization algorithm to prevent repetitive results
- Client-side generation (no API route needed)
- Clipboard API integration with fallback
- Web Share API for native mobile sharing
- Framer Motion for card entrance animations
- Input validation and sanitization

Data Schema (lib/messages.ts):
```typescript
export interface MessageTemplate {
  id: string;
  mood: 'romantic' | 'cute' | 'funny' | 'emotional';
  template: string; // Uses {yourName} and {partnerName} placeholders
  category: string;
}

export type MoodType = MessageTemplate['mood'];

// Example usage:
// const message = template.replace(/{yourName}/g, yourName)
//                        .replace(/{partnerName}/g, partnerName);
```

Feature 2: Proposal Page Generator
Purpose: Create personalized, shareable proposal pages with unique URLs
Part A: Creation Interface
User Flow:

User fills out proposal form
Selects visual theme
Optionally uploads romantic image
Clicks "Create Proposal"
Receives unique URL to share

Form Fields:

Your Name (required, max 30 chars)
Partner Name (required, max 30 chars)
Custom Message (optional, max 200 chars)
Theme Selection (Romantic / Cute / Funny)
Image Upload (optional, max 5MB, jpg/png)

Technical Requirements:

- Slug generation from names (e.g., "john-for-sarah")
- Unique slug validation to prevent collisions
- Image upload to Supabase Storage with progress indicator
- Database record creation with proposal details
- URL generation and display with copy functionality
- Copy URL button with success feedback
- Form validation (required fields, character limits, file size/type)
- Error handling for upload failures

Part B: Proposal Landing Page
URL Structure: `/propose/[slug]`
UI Elements:

- Full-screen background gradient (theme-based)
- Animated floating hearts/roses/emojis (CSS animations via `FloatingHearts` component)
- Center card with:
  - Uploaded image (if provided) with Next/Image optimization
  - "[Partner Name], will you be my Valentine?" heading
  - Custom message (if provided)
  - Two interactive buttons (YES ❤️ and NO 😅)

FloatingHearts Component:
- Renders 15 animated emoji elements (❤️, 💕, 💖, 💗, 💝, 🌹, ✨)
- Random positioning, size, duration, and delay
- CSS keyframe animations for smooth floating effect
- Performance optimized with minimal re-renders



Button Interactions:
ButtonBehaviorYES ❤️Triggers confetti animation, displays celebration message, offers share optionNO 😅Button dodges cursor/touch (CSS transform or JS), becomes progressively harder to click
Technical Requirements:

Dynamic metadata generation for SEO
OpenGraph image generation for social previews
Confetti library (canvas-confetti)
Touch event handling for mobile "dodge" behavior
Server-side data fetching for proposal details

Data Schema (Supabase):
```typescript
export interface Proposal {
  id: string;
  slug: string; // Unique identifier, indexed for fast lookups
  your_name: string; // Max 30 characters
  partner_name: string; // Max 30 characters
  message: string | null; // Max 200 characters, optional
  theme: 'romantic' | 'cute' | 'funny';
  image_url: string | null; // Supabase Storage URL
  created_at: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
  response: 'yes' | 'no' | null;
  view_count?: number; // Track page views
}

// Database table: proposals
// Required indexes: slug (unique), created_at
// RLS Policy: Public read access, authenticated write access
```

Feature 3: Love Compatibility Calculator
Purpose: Calculate playful compatibility percentage between two names
User Flow:

User enters both names
Optionally enters dates of birth
Clicks "Calculate"
System displays compatibility percentage with explanation
User can download result card or share socially

UI Components:

Name input fields
Optional DOB pickers
Calculate button
Animated percentage counter (0→result)
Compatibility meter/gauge
Explanatory text based on percentage
Downloadable result card (HTML-to-canvas)
Share buttons

Compatibility Logic:
```typescript
// Deterministic algorithm ensuring same inputs = same outputs
function calculateCompatibility(
  name1: string, 
  name2: string, 
  dob1?: Date, 
  dob2?: Date
): number {
  // 1. Normalize inputs (lowercase, trim)
  const normalized1 = name1.toLowerCase().trim();
  const normalized2 = name2.toLowerCase().trim();
  
  // 2. Generate hash from combined names + DOBs
  const combined = `${normalized1}-${normalized2}-${dob1?.getTime() || ''}-${dob2?.getTime() || ''}`;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // 3. Use seeded random to produce consistent percentage
  // Use Math.abs to ensure positive number, then modulo 100
  const percentage = Math.abs(hash) % 100;
  
  // 4. Return value between 0-100
  return percentage;
}
```
Percentage Ranges & Messages:
RangeCategorySample Message90-100%Perfect Match"You two are soulmates! ✨"75-89%Great Match"Strong chemistry detected! 💕"50-74%Good Match"You complement each other well! 😊"25-49%Mixed"Opposites attract, right? 🤔"0-24%Low"Sometimes friendships are better! 😅"
Technical Requirements:

- Deterministic hash function (no database lookup needed)
- Client-side calculation (no API route needed)
- HTML-to-image conversion for result cards using html-to-image library
- Prominent disclaimer: "For entertainment purposes only"
- Meta tag generation for shareable results
- Animated percentage counter with easing
- Visual compatibility meter/gauge component


🎨 Design System
Color Palette
css/* Primary Colors */
--romantic-red: #E63946;
--soft-pink: #FFB6C1;
--warm-white: #FFF5F7;
--deep-rose: #C1121F;
--accent-gold: #FFD700;

/* Gradients */
--romantic-gradient: linear-gradient(135deg, #E63946 0%, #FFB6C1 100%);
--cute-gradient: linear-gradient(135deg, #FFB6C1 0%, #FFF5F7 100%);
--funny-gradient: linear-gradient(135deg, #FFD700 0%, #FFB6C1 100%);
Typography

Headings: Playfair Display / Montserrat (elegant serif/sans)
Body: Inter / Open Sans (readable, modern)
Accents: Pacifico / Dancing Script (romantic script)

Animation Principles

Entrance: Fade + slide from bottom (300ms)
Interactions: Scale on hover (150ms)
Success states: Bounce + color shift (400ms)
Transitions: Ease-out for natural feel

Responsive Breakpoints
```typescript
// Tailwind CSS default breakpoints (configured in tailwind.config)
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large desktop
}

// Usage in Tailwind: sm:, md:, lg:, xl:, 2xl:
```

🔍 SEO & Sharing Strategy
Page-Level SEO
Homepage:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Valentine All-in-One | Love Messages, Proposals & Compatibility',
  description: 'Create romantic messages, proposal pages, and calculate love compatibility. Free Valentine\'s Day tools for couples.',
  keywords: ['valentine', 'love message', 'proposal', 'compatibility calculator', 'valentines day'],
  authors: [{ name: 'Valentine Platform' }],
  openGraph: {
    title: 'Valentine All-in-One Platform',
    description: 'Express your love with personalized messages and proposals',
    images: ['/og-home.jpg'],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valentine All-in-One Platform',
    description: 'Express your love with personalized messages and proposals',
    images: ['/og-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
}
```
Dynamic Proposal Pages:
```typescript
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const proposal = await getProposal(params.slug);
  
  if (!proposal) {
    return {
      title: 'Proposal Not Found',
      description: 'This proposal page could not be found.'
    };
  }
  
  return {
    title: `${proposal.your_name}'s Proposal to ${proposal.partner_name}`,
    description: `${proposal.your_name} has something special to ask ${proposal.partner_name}...`,
    openGraph: {
      title: `${proposal.your_name}'s Proposal`,
      description: proposal.message || `A special Valentine's proposal`,
      images: proposal.image_url ? [proposal.image_url] : ['/og-default.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    }
  };
}
```
Social Sharing Features

Pre-filled share text: "Check out this Valentine surprise! 💕"
WhatsApp deep linking: https://wa.me/?text=...
Instagram sharing: Via Web Share API on mobile
Twitter/X cards: Properly formatted metadata


🚀 Performance Requirements
Core Web Vitals Targets
| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Image optimization, code splitting, CDN |
| FID | < 100ms | Minimal JavaScript, event delegation |
| CLS | < 0.1 | Fixed dimensions, font preloading |
| TTFB | < 600ms | Edge caching, optimized database queries |
| FCP | < 1.8s | Critical CSS inlining, resource prioritization |
Optimization Strategies

Image Handling:

Next/Image for automatic optimization
WebP format with fallbacks
Lazy loading for below-fold content
Responsive srcsets


Code Splitting:

Dynamic imports for heavy components
Route-based code splitting (automatic in Next.js)
Tree-shaking unused libraries


Caching:

Static page generation where possible
Incremental Static Regeneration for proposals
Browser caching headers


Bundle Size:

Target < 200KB initial JavaScript
Remove unused Tailwind classes
Analyze with webpack-bundle-analyzer




🔐 Data & Privacy
Data Collection

Stored: Proposal details, response status
Not Stored: Generated messages (ephemeral), compatibility inputs (unless shared)
User Identification: No authentication required; proposals linked only via slug

Privacy Measures

No personal data collection beyond what user explicitly enters
No tracking cookies (analytics only)
Clear data retention policy (proposals expire after 1 year)
Option to delete proposals via email request

Security

- Input sanitization to prevent XSS attacks
- HTML entity encoding for user-generated content
- Rate limiting considerations (client-side throttling or middleware)
- File upload validation (type: jpg/png, size: max 5MB)
- Supabase Row-Level Security (RLS) policies enabled
- SQL injection prevention (using Supabase client, parameterized queries)
- CORS configuration for Supabase Storage
- Content Security Policy headers
- Secure cookie handling (if authentication added)


📱 Mobile-First Considerations
Touch Interactions

Minimum tap target size: 44x44px
Swipe gestures for image galleries
Haptic feedback on button interactions (iOS)

Mobile-Specific Features

Native share sheet integration
Offline-first compatibility calculator (service worker)
Add to Home Screen prompt
Optimized form inputs (proper keyboard types)

Responsive Design Patterns

Single-column layouts on mobile
Collapsible navigation
Bottom-sheet modals instead of center modals
Thumb-zone optimization for primary CTAs


🧪 Testing & Quality Assurance
Testing Checklist
Functionality:

 All form validations work correctly
 Message generation produces varied results
 Proposal pages load with correct data
 Share buttons open correct platforms
 "No" button dodge behavior works on touch

Cross-Browser:

 Chrome (latest 2 versions)
 Safari (iOS + macOS)
 Firefox (latest)
 Samsung Internet

Performance:

 Lighthouse score >90 on mobile
 All images under 200KB
 No blocking JavaScript on initial load

SEO:

 All meta tags present and valid
 OpenGraph images generate correctly
 Structured data where applicable
 Clean, readable URLs


🌟 Bonus Features (Phase 2)
Dark Mode

Toggle in navbar
Persistent preference (localStorage)
Adjusted color palette maintaining romance theme

Analytics Dashboard

Page view tracking (Vercel Analytics)
Share conversion rates
Popular message moods
Peak usage times

Internationalization

Hindi translation for all UI text
Language switcher component
Date formatting based on locale

Admin Panel

View recent proposals
Moderation tools for reported content
Usage statistics dashboard
Feature flag controls


📅 Deployment & Launch
Environment Configuration
```bash
# .env.local (never commit this file)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key  # Server-side only
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Optional: Error Tracking
SENTRY_DSN=your_sentry_dsn
```
Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Domain connected and SSL verified
- [ ] Supabase production database populated with schema
- [ ] Supabase Storage bucket created and configured with CORS
- [ ] Row-Level Security (RLS) policies enabled
- [ ] Rate limiting middleware deployed (if using)
- [ ] Error tracking enabled (Sentry or similar)
- [ ] Analytics configured (Vercel Analytics)
- [ ] Build passes without errors (`npm run build`)
- [ ] All TypeScript types compile correctly
- [ ] ESLint passes (`npm run lint`)
- [ ] Performance testing completed (Lighthouse)
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed
- [ ] SEO meta tags verified
- [ ] Social sharing previews tested

Launch Strategy

Soft Launch (1 week before Valentine's): Beta test with small audience
Social Media Campaign: Share example proposals on Instagram/Twitter
PR Outreach: Submit to Product Hunt, Hacker News
Influencer Partnerships: Collaborate with relationship content creators


📊 Success Measurement
KPIs (First 30 Days)
| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| Unique Visitors | 100,000 | Vercel Analytics |
| Proposals Created | 10,000 | Database query |
| Share Rate | 40% | Event tracking |
| Avg. Session Duration | 3 min | Analytics |
| Mobile Traffic % | 70% | Analytics |
| Returning Visitors | 25% | Analytics |
| Bounce Rate | < 50% | Analytics |
| Pages per Session | > 2 | Analytics |
Feedback Collection

Thumbs up/down on generated content
Optional feedback form
Social media monitoring
User testing sessions


🛠️ Maintenance & Support
Ongoing Tasks

Daily: Monitor error logs, check uptime
Weekly: Review analytics, respond to feedback
Monthly: Update message templates, security patches
Seasonal: Prepare for next Valentine's Day

Support Channels

Help page with FAQs
Contact form for urgent issues
Social media DMs for general inquiries


📝 Appendix
Code Quality Standards

- TypeScript strict mode enabled (`strict: true` in tsconfig.json)
- ESLint configured with Next.js recommended rules
- Prettier configured for consistent formatting (optional)
- Meaningful component/function names (descriptive, not abbreviated)
- JSDoc comments for complex logic and public APIs
- Maximum function length: 50 lines (prefer smaller, focused functions)
- Component files under 200 lines (split into smaller components if needed)
- Consistent import ordering (external → internal → relative)
- No `any` types (use `unknown` or proper types)
- Error handling for all async operations
- Loading states for user feedback

Accessibility (WCAG 2.1 AA)

Semantic HTML elements
Proper heading hierarchy
Alt text for all images
Keyboard navigation support
Sufficient color contrast ratios
Screen reader tested

File Naming Conventions

- Components: PascalCase (e.g., `ShareButtons.tsx`)
- Utilities: camelCase (e.g., `generateSlug.ts`)
- Pages: kebab-case (e.g., `love-message/page.tsx`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Types/Interfaces: PascalCase (e.g., `MessageTemplate`)
- Hooks: camelCase with "use" prefix (e.g., `useProposal.ts`)
- API Routes: kebab-case (e.g., `create-proposal/route.ts`)

Additional Notes:
- Use `.tsx` for files containing JSX
- Use `.ts` for TypeScript-only files
- Use `page.tsx` for Next.js App Router pages
- Use `layout.tsx` for Next.js layouts
- Use `route.ts` for API route handlers