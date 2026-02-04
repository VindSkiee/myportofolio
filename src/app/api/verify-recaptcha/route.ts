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

// In-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

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
        { status: 500 }
      );
    }
    
    console.log('✅ Secret key loaded:', RECAPTCHA_SECRET_KEY.substring(0, 15) + '...');

    // 2. RATE LIMITING
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { allowed: false, reason: rateLimitCheck.reason },
        { status: 429 }
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
      return NextResponse.json(
        { allowed: false, reason: 'Missing or invalid recaptchaToken' },
        { status: 400 }
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
      console.warn('⚠️ reCAPTCHA verification failed:', data['error-codes']);
      console.warn('Full Google response:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { 
          allowed: false, 
          reason: 'reCAPTCHA verification failed',
          errors: data['error-codes'],
          details: data
        },
        { status: 400 }
      );
    }

    // 7. CHECK SCORE (v3 only)
    if (typeof data.score === 'number' && data.score < MINIMUM_SCORE) {
      console.warn(`⚠️ Low reCAPTCHA score: ${data.score} (threshold: ${MINIMUM_SCORE})`);
      return NextResponse.json(
        { allowed: false, reason: `Suspicious activity detected (score: ${data.score.toFixed(2)})` },
        { status: 400 }
      );
    }

    // 8. CHECK ACTION (v3 only) - Optional for test keys
    if (action && data.action && data.action !== action) {
      console.warn(`⚠️ Action mismatch: expected "${action}", got "${data.action}"`);
      return NextResponse.json(
        { allowed: false, reason: 'Action mismatch' },
        { status: 400 }
      );
    }
    
    // Log if action is missing (common with test keys)
    if (!data.action) {
      console.log('ℹ️ No action in response (possibly using test keys)');
    }

    // 9. SUCCESS
    console.log(`✅ reCAPTCHA verified | Score: ${data.score} | Action: ${data.action} | IP: ${clientIp}`);
    
    return NextResponse.json({
      allowed: true,
      score: data.score,
      action: data.action
    });

  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error);
    return NextResponse.json(
      { allowed: false, reason: 'Internal server error during verification' },
      { status: 500 }
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
