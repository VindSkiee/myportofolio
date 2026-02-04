/**
 * ============================================================
 * VERCEL EDGE MIDDLEWARE - Security & Rate Limiting
 * ============================================================
 * Purpose: Global security headers + API rate limiting
 * Platform: Next.js 15 + Vercel Edge Runtime
 * ============================================================
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const API_RATE_LIMIT_WINDOW = 60000; // 1 minute for API
const MAX_API_REQUESTS = 5; // 5 API requests per minute per IP

// In-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate Limiting Helper
 */
function checkRateLimit(
  ip: string, 
  maxRequests: number = MAX_REQUESTS_PER_WINDOW,
  window: number = RATE_LIMIT_WINDOW
): { allowed: boolean; reason?: string; retryAfter?: number } {
  const now = Date.now();
  const key = `${ip}:${window}`;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + window });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { 
      allowed: false, 
      reason: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
      retryAfter
    };
  }

  record.count++;
  return { allowed: true };
}

/**
 * Log suspicious activity (without sensitive data)
 */
function logSuspiciousActivity(
  ip: string, 
  path: string, 
  reason: string,
  userAgent?: string
) {
  const timestamp = new Date().toISOString();
  console.warn(`🚨 SECURITY ALERT [${timestamp}]`);
  console.warn(`   IP: ${ip}`);
  console.warn(`   Path: ${path}`);
  console.warn(`   Reason: ${reason}`);
  console.warn(`   User-Agent: ${userAgent || 'unknown'}`);
}

/**
 * Middleware function
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get client IP
  const clientIp = 
    request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    'unknown';

  const userAgent = request.headers.get('user-agent') || 'unknown';

  // ===== RATE LIMITING FOR API ROUTES =====
  if (pathname.startsWith('/api/')) {
    const rateLimitCheck = checkRateLimit(
      clientIp, 
      MAX_API_REQUESTS, 
      API_RATE_LIMIT_WINDOW
    );
    
    if (!rateLimitCheck.allowed) {
      logSuspiciousActivity(
        clientIp, 
        pathname, 
        'API rate limit exceeded',
        userAgent
      );
      
      return NextResponse.json(
        { 
          allowed: false, 
          reason: rateLimitCheck.reason,
          error: 'Too Many Requests'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitCheck.retryAfter?.toString() || '60',
            'X-RateLimit-Limit': MAX_API_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + API_RATE_LIMIT_WINDOW).toISOString(),
          }
        }
      );
    }
  }

  // ===== SECURITY HEADERS =====
  const response = NextResponse.next();
  
  // Basic Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (restrict dangerous features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  
  // Content Security Policy (CSP)
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://cdn.emailjs.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.emailjs.com https://www.google.com https://www.gstatic.com",
    "frame-src 'self' https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));

  // Cache Control for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

/**
 * Configure which paths to run middleware on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
