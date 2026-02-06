import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Set locale cookie if not present
  const localeCookie = request.cookies.get('locale')
  
  if (!localeCookie) {
    // Get locale from Accept-Language header or default to 'en'
    const acceptLanguage = request.headers.get('accept-language') || ''
    let locale = 'en'
    
    if (acceptLanguage.includes('hi')) {
      locale = 'hi'
    }
    
    const response = NextResponse.next()
    response.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 }) // 1 year
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg).*)',
  ],
}
