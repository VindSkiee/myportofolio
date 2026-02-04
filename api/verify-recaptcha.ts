/**
 * ============================================================
 * SERVERLESS FUNCTION: reCAPTCHA v3 Verification
 * ============================================================
 * Purpose: Securely verify reCAPTCHA tokens from frontend
 * Platform: Vercel Serverless Functions
 * Security: Secret key stored in environment variables
 * ============================================================
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

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
const EXPECTED_ACTION = 'submit'; // Must match frontend action

// In-memory rate limiting (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Rate Limiting Helper
 * Note: This is basic in-memory rate limiting.
 * For production, use Redis, Vercel KV, or Upstash for persistent rate limiting.
 */
function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { 
      allowed: false, 
      reason: `Rate limit exceeded. Max ${MAX_REQUESTS_PER_WINDOW} requests per minute.` 
    };
  }

  // Increment count
  record.count++;
  return { allowed: true };
}

/**
 * Main Handler
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS Headers (adjust origin in production)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change to your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. METHOD VALIDATION
  if (req.method !== 'POST') {
    return res.status(405).json({
      allowed: false,
      reason: 'Method not allowed. Use POST.'
    });
  }

  // 2. SECRET KEY VALIDATION
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('❌ RECAPTCHA_SECRET_KEY not configured in environment variables');
    return res.status(500).json({
      allowed: false,
      reason: 'Server configuration error'
    });
  }

  // 3. RATE LIMITING
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                   (req.headers['x-real-ip'] as string) || 
                   'unknown';
  
  const rateLimitCheck = checkRateLimit(clientIp);
  if (!rateLimitCheck.allowed) {
    return res.status(429).json({
      allowed: false,
      reason: rateLimitCheck.reason
    });
  }

  // 4. TOKEN VALIDATION
  const { recaptchaToken, action } = req.body as RequestBody;

  if (!recaptchaToken || typeof recaptchaToken !== 'string') {
    return res.status(400).json({
      allowed: false,
      reason: 'Missing or invalid recaptchaToken'
    });
  }

  try {
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
      return res.status(400).json({
        allowed: false,
        reason: 'reCAPTCHA verification failed',
        errors: data['error-codes']
      });
    }

    // 7. CHECK SCORE (v3 only)
    if (typeof data.score !== 'number') {
      console.warn('⚠️ No score returned (might be reCAPTCHA v2)');
    } else if (data.score < MINIMUM_SCORE) {
      console.warn(`⚠️ Low reCAPTCHA score: ${data.score} (threshold: ${MINIMUM_SCORE})`);
      return res.status(400).json({
        allowed: false,
        reason: `Suspicious activity detected (score: ${data.score.toFixed(2)})`,
      });
    }

    // 8. CHECK ACTION (v3 only)
    if (action && data.action !== action) {
      console.warn(`⚠️ Action mismatch: expected "${action}", got "${data.action}"`);
      return res.status(400).json({
        allowed: false,
        reason: 'Action mismatch'
      });
    }

    // 9. SUCCESS
    console.log(`✅ reCAPTCHA verified | Score: ${data.score} | Action: ${data.action} | IP: ${clientIp}`);
    
    return res.status(200).json({
      allowed: true,
      score: data.score,
      action: data.action
    });

  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error);
    return res.status(500).json({
      allowed: false,
      reason: 'Internal server error during verification'
    });
  }
}
