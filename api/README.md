# 🚀 Serverless API Routes

This folder contains Vercel Serverless Functions for backend operations.

## 📁 Structure

```
api/
├── verify-recaptcha.ts    # Google reCAPTCHA v3 verification endpoint
└── README.md              # This file
```

## 🔐 `/api/verify-recaptcha`

**Purpose:** Securely verify reCAPTCHA tokens from frontend

**Method:** `POST`

**Request Body:**
```json
{
  "recaptchaToken": "03AGdBq27...",
  "action": "submit"
}
```

**Response (Success):**
```json
{
  "allowed": true,
  "score": 0.9,
  "action": "submit"
}
```

**Response (Failed):**
```json
{
  "allowed": false,
  "reason": "Suspicious activity detected (score: 0.2)"
}
```

## 🔧 Local Development

```bash
# Start dev server
npm run dev

# API will be available at:
http://localhost:3000/api/verify-recaptcha
```

## 📖 Full Documentation

See [RECAPTCHA_BACKEND.md](../RECAPTCHA_BACKEND.md) for complete setup guide.

## 🔑 Environment Variables Required

```bash
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

Create `.env.local` in project root (already configured).
