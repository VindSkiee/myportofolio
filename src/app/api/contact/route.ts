/**
 * ============================================================
 * API ROUTE: Server-Side Email Sending via EmailJS
 * ============================================================
 * Purpose: Send emails from server to avoid CORS and client issues
 * Platform: Next.js 15 App Router + Vercel
 * ============================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

// Configuration
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
}

/**
 * Send request using native https module (more reliable than fetch in Node.js)
 */
function sendWithHttps(data: object): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'api.emailjs.com',
      port: 443,
      path: '/api/v1.0/email/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'MyPortfolio/1.0',
        'Origin': 'https://vinnd.tech',
      },
      timeout: 30000, // 30 seconds
      // Force IPv4 to avoid potential IPv6 issues
      family: 4,
    };

    console.log('📡 Sending via HTTPS module (IPv4)...');
    
    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        console.log(`📬 Response status: ${res.statusCode}`);
        resolve({ status: res.statusCode || 500, body });
      });
    });

    req.on('error', (error: any) => {
      console.error('❌ HTTPS request error:', error.message);
      console.error('   Error code:', error.code);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Retry helper with HTTPS fallback
 */
async function sendEmailWithRetry(
  emailData: object,
  maxRetries: number = 3
): Promise<{ status: number; body: string }> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📡 Attempt ${attempt}/${maxRetries} to EmailJS API...`);
      
      // Use native HTTPS module (more reliable than fetch)
      const result = await sendWithHttps(emailData);
      return result;
      
    } catch (error: any) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError || new Error('Failed to send email after retries');
}

/**
 * POST Handler - Send Email
 */
export async function POST(request: NextRequest) {
  try {
    // 1. VALIDATE CONFIGURATION
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PRIVATE_KEY) {
      console.error('❌ EmailJS not configured');
      console.error('Available env vars:', {
        hasServiceId: !!EMAILJS_SERVICE_ID,
        hasTemplateId: !!EMAILJS_TEMPLATE_ID,
        hasPrivateKey: !!EMAILJS_PRIVATE_KEY,
      });
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    // 2. PARSE REQUEST BODY
    const body: EmailRequestBody = await request.json();
    const { name, email, message } = body;

    // 3. VALIDATE INPUT
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    if (name.length < 2 || name.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2-50 characters' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 10-1000 characters' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    console.log('📧 Sending email via server-side...', { name, email });

    // 4. SEND EMAIL VIA EMAILJS API WITH RETRY LOGIC (using native HTTPS)
    const emailData = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: {
        name: name,
        email: email,
        message: message,
      },
    };

    let emailResult: { status: number; body: string };
    try {
      emailResult = await sendEmailWithRetry(emailData, 3);
    } catch (error: any) {
      console.error('❌ EmailJS API connection error:', error.message);
      console.error('   Error code:', error.code || 'N/A');
      console.error('   Error name:', error.name || 'N/A');
      
      // Provide user-friendly error message
      let errorMessage = 'Failed to connect to email service';
      let errorDetails = error.message;
      
      if (error.code === 'ECONNRESET') {
        errorMessage = 'Connection to email service was interrupted';
        errorDetails = 'The connection was reset. This might be due to network issues or firewall settings.';
      } else if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
        errorMessage = 'Email service request timed out';
        errorDetails = 'The request took too long. Please try again.';
      } else if (error.code === 'ENOTFOUND') {
        errorMessage = 'Could not reach email service';
        errorDetails = 'DNS resolution failed. Please check your internet connection.';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessage,
          details: errorDetails,
          retryable: true
        },
        { 
          status: 503, // Service Unavailable
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Retry-After': '30', // Suggest retry after 30 seconds
          }
        }
      );
    }

    // 5. CHECK RESPONSE
    if (emailResult.status !== 200) {
      console.error('❌ EmailJS API error:', emailResult.status, emailResult.body);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: emailResult.body 
        },
        {
          status: emailResult.status,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          }
        }
      );
    }

    console.log('✅ Email sent successfully:', emailResult.body);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        }
      }
    );

  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error.message 
      },
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
    service: 'Server-Side Email Sending API',
    method: 'POST only',
    status: 'operational',
    configured: !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PRIVATE_KEY)
  });
}
