/**
 * ============================================================
 * API ROUTE: Server-Side Email Sending via EmailJS
 * ============================================================
 * Purpose: Send emails from server to avoid CORS and client issues
 * Platform: Next.js 15 App Router + Vercel
 * ============================================================
 */

import { NextRequest, NextResponse } from 'next/server';

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
        { status: 500 }
      );
    }

    // 2. PARSE REQUEST BODY
    const body: EmailRequestBody = await request.json();
    const { name, email, message } = body;

    // 3. VALIDATE INPUT
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2-50 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 10-1000 characters' },
        { status: 400 }
      );
    }

    console.log('📧 Sending email via server-side...', { name, email });

    // 4. SEND EMAIL VIA EMAILJS API
    const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          name: name,
          email: email,
          message: message,
        },
      }),
    });

    // 5. CHECK RESPONSE
    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('❌ EmailJS API error:', emailResponse.status, errorText);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: errorText 
        },
        { status: emailResponse.status }
      );
    }

    const result = await emailResponse.text();
    console.log('✅ Email sent successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });

  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
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
