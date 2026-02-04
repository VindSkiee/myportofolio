/**
 * ============================================================
 * API ROUTE: reCAPTCHA v3 Verification
 * ============================================================
 * Purpose: Securely verify reCAPTCHA tokens from frontend
 * Platform: Next.js 15 App Router + Vercel
 * Security: Secret key stored in environment variables
 * ============================================================
 */

import { NextRequest, NextResponse } from 'next/server';

// Types
interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

interface RequestBody {
  recaptchaToken?: string;
  action?: string;
}

// Configuration
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MINIMUM_SCORE = 0.5; // reCAPTCHA v3 score threshold (0.0 - 1.0)
const ALLOWED_ACTIONS = ['submit', 'contact']; // Valid actions
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const ALLOWED_HOSTNAMES = ['localhost', 'vinnd.tech', 'www.vinnd.tech']; // Add your domains

// In-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Log abuse attempts (without sensitive data)
 */
function logAbuseAttempt(
  ip: string,
  reason: string,
  details?: Record<string, any>
) {
  const timestamp = new Date().toISOString();
  console.warn(`🚨 ABUSE DETECTED [${timestamp}]`);
  console.warn(`   IP: ${ip}`);
  console.warn(`   Reason: ${reason}`);
  if (details) {
    console.warn(`   Details:`, JSON.stringify(details, null, 2));
  }
}

/**
 * Rate Limiting Helper
 */
function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { 
      allowed: false, 
      reason: `Rate limit exceeded. Max ${MAX_REQUESTS_PER_WINDOW} requests per minute.` 
    };
  }

  record.count++;
  return { allowed: true };
}

/**
 * POST Handler
 */
export async function POST(request: NextRequest) {
  try {
    // 1. SECRET KEY VALIDATION
    if (!RECAPTCHA_SECRET_KEY) {
      console.error('❌ RECAPTCHA_SECRET_KEY not configured');
      console.error('Environment variables:', Object.keys(process.env).filter(k => k.includes('RECAPTCHA')));
      return NextResponse.json(
        { allowed: false, reason: 'Server configuration error' },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }
    
    console.log('✅ Secret key loaded:', RECAPTCHA_SECRET_KEY.substring(0, 15) + '...');

    // 2. RATE LIMITING
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      logAbuseAttempt(clientIp, 'Rate limit exceeded', {
        window: RATE_LIMIT_WINDOW,
        maxRequests: MAX_REQUESTS_PER_WINDOW
      });
      return NextResponse.json(
        { allowed: false, reason: rateLimitCheck.reason },
        { 
          status: 429,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    // 3. PARSE REQUEST BODY
    const body: RequestBody = await request.json();
    const { recaptchaToken, action } = body;

    console.log('📥 Received request body:', { 
      hasToken: !!recaptchaToken, 
      tokenLength: recaptchaToken?.length,
      action: action || 'not provided'
    });

    // 4. TOKEN VALIDATION
    if (!recaptchaToken || typeof recaptchaToken !== 'string') {
      console.error('❌ Invalid token:', recaptchaToken);
      logAbuseAttempt(clientIp, 'Invalid or missing token', {
        hasToken: !!recaptchaToken,
        tokenType: typeof recaptchaToken
      });
      return NextResponse.json(
        { allowed: false, reason: 'Missing or invalid recaptchaToken' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    // 5. VERIFY WITH GOOGLE API
    const verifyResponse = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });

    if (!verifyResponse.ok) {
      throw new Error(`Google API returned status ${verifyResponse.status}`);
    }

    const data: RecaptchaVerifyResponse = await verifyResponse.json();

    // 6. VALIDATE RESPONSE
    if (!data.success) {
      const errorCodes = data['error-codes'] || [];
      console.warn('⚠️ reCAPTCHA verification failed:', errorCodes);
      console.warn('Full Google response:', JSON.stringify(data, null, 2));
      console.warn('Secret key used (first 15 chars):', RECAPTCHA_SECRET_KEY.substring(0, 15));
      console.warn('Hostname from Google:', data.hostname || 'undefined');
      console.warn('Environment:', IS_DEVELOPMENT ? 'development' : 'production');
      
      // Check for browser-error (common in development or key mismatch)
      const hasBrowserError = errorCodes.includes('browser-error');
      if (hasBrowserError) {
        console.error('❌ BROWSER-ERROR detected! This usually means:');
        console.error('   1. Site key and Secret key mismatch');
        console.error('   2. Using production keys on localhost (or vice versa)');
        console.error('   3. Domain not registered with this reCAPTCHA key');
        console.error('   👉 Check your RECAPTCHA_SECRET_KEY and NEXT_PUBLIC_RECAPTCHA_SITE_KEY');
      }
      
      // Don't log as abuse in development for browser-error (likely config issue)
      if (!IS_DEVELOPMENT || !hasBrowserError) {
        logAbuseAttempt(clientIp, 'reCAPTCHA verification failed', {
          errors: errorCodes,
          hostname: data.hostname,
          action: data.action,
          environment: IS_DEVELOPMENT ? 'development' : 'production'
        });
      }
      
      // More helpful error message
      let reason = 'reCAPTCHA verification failed';
      if (hasBrowserError) {
        reason = IS_DEVELOPMENT 
          ? 'reCAPTCHA configuration issue - check console for details' 
          : 'Security verification failed';
      }
      
      return NextResponse.json(
        { 
          allowed: false, 
          reason,
          errors: errorCodes,
          details: data,
          debug: IS_DEVELOPMENT ? {
            hostname: data.hostname || 'undefined',
            secretKeyPrefix: RECAPTCHA_SECRET_KEY.substring(0, 10) + '...',
            environment: 'development',
            tip: hasBrowserError ? 'Check if site key and secret key match' : undefined
          } : undefined
        },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    // 7. CHECK SCORE (v3 only)
    if (typeof data.score === 'number' && data.score < MINIMUM_SCORE) {
      console.warn(`⚠️ Low reCAPTCHA score: ${data.score} (threshold: ${MINIMUM_SCORE})`);
      
      logAbuseAttempt(clientIp, 'Low reCAPTCHA score - possible bot', {
        score: data.score,
        threshold: MINIMUM_SCORE,
        action: data.action,
        hostname: data.hostname
      });
      
      return NextResponse.json(
        { allowed: false, reason: `Suspicious activity detected (score: ${data.score.toFixed(2)})` },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    // 8. CHECK ACTION (v3 only)
    if (data.action) {
      // Strict action validation
      if (action && data.action !== action) {
        console.warn(`⚠️ Action mismatch: expected "${action}", got "${data.action}"`);
        
        logAbuseAttempt(clientIp, 'Action mismatch - possible replay attack', {
          expected: action,
          received: data.action,
          hostname: data.hostname
        });
        
        return NextResponse.json(
          { allowed: false, reason: 'Action mismatch' },
          { 
            status: 400,
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate',
            }
          }
        );
      }
      
      // Validate action is in allowed list
      if (!ALLOWED_ACTIONS.includes(data.action)) {
        console.warn(`⚠️ Invalid action: "${data.action}"`);
        
        logAbuseAttempt(clientIp, 'Invalid action - possible manipulation', {
          action: data.action,
          allowedActions: ALLOWED_ACTIONS
        });
        
        return NextResponse.json(
          { allowed: false, reason: 'Invalid action' },
          { 
            status: 400,
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate',
            }
          }
        );
      }
    } else {
      console.log('ℹ️ No action in response (possibly using test keys)');
    }
    
    // 9. CHECK HOSTNAME (Critical security check)
    if (data.hostname) {
      const isValidHostname = ALLOWED_HOSTNAMES.some(allowed => 
        data.hostname === allowed || data.hostname?.endsWith(`.${allowed}`)
      );
      
      if (!isValidHostname) {
        console.warn(`⚠️ Invalid hostname: "${data.hostname}"`);
        
        // In development, just warn but don't block
        if (IS_DEVELOPMENT) {
          console.warn('⚠️ Development mode: Allowing request despite hostname mismatch');
          console.warn(`   Hostname: ${data.hostname}`);
          console.warn(`   Allowed: ${ALLOWED_HOSTNAMES.join(', ')}`);
        } else {
          // In production, block unauthorized domains
          logAbuseAttempt(clientIp, 'Invalid hostname - possible external abuse', {
            hostname: data.hostname,
            allowedHostnames: ALLOWED_HOSTNAMES
          });
          
          return NextResponse.json(
            { allowed: false, reason: 'Request from unauthorized domain' },
            { 
              status: 403,
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
              }
            }
          );
        }
      }
    } else {
      // Hostname undefined - common in development
      if (IS_DEVELOPMENT) {
        console.log('ℹ️ Hostname undefined (common in development)');
      } else {
        console.warn('⚠️ Hostname undefined in production - possible configuration issue');
      }
    }

    // 10. SUCCESS
    console.log(`✅ reCAPTCHA verified | Score: ${data.score} | Action: ${data.action} | Hostname: ${data.hostname} | IP: ${clientIp}`);
    
    return NextResponse.json(
      {
        allowed: true,
        score: data.score,
        action: data.action,
        hostname: data.hostname
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      }
    );

  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error);
    return NextResponse.json(
      { allowed: false, reason: 'Internal server error during verification' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      }
    );
  }
}

/**
 * GET Handler - Return API info
 */
export async function GET() {
  return NextResponse.json({
    service: 'reCAPTCHA v3 Verification API',
    method: 'POST only',
    status: 'operational'
  });
}
