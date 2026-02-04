# 🔐 reCAPTCHA v3 Serverless Backend

## 📋 Architecture Overview

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Frontend      │      │  Next.js 15      │      │   Google        │
│   (React)       │─────▶│  App Router      │─────▶│   reCAPTCHA     │
│                 │      │  API Route       │      │   API           │
│  Contact Form   │      │  /api/verify     │      │   siteverify    │
└─────────────────┘      └──────────────────┘      └─────────────────┘
         │                        │                         │
         │                        │                         │
         ▼                        ▼                         ▼
    Generate Token          Verify Token            Return Score
    (Site Key)             (Secret Key)            (0.0 - 1.0)
```

## 🚀 Quick Start

### 1. Setup Environment Variables

Create `.env.local` in project root:

```bash
RECAPTCHA_SECRET_KEY=6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

**⚠️ NEVER commit `.env.local` to Git!**

### 2. Install Dependencies (if needed)

```bash
npm install @vercel/node
```

### 3. Test Locally

```bash
npm run dev
```

The endpoint will be available at:
- Local: `http://localhost:3000/api/verify-recaptcha`
- Production: `https://yourdomain.com/api/verify-recaptcha`

### 4. Deploy to Vercel

```bash
vercel --prod
```

Add environment variable in Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add: `RECAPTCHA_SECRET_KEY` = `6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR`
3. Redeploy

---

## 🔧 How It Works

### Frontend Flow

```typescript
// 1. User submits form
handleSubmit()

// 2. Generate reCAPTCHA token (client-side)
const token = await grecaptcha.execute('SITE_KEY', { action: 'submit' });

// 3. Send token to backend for verification
const response = await fetch('/api/verify-recaptcha', {
  method: 'POST',
  body: JSON.stringify({ recaptchaToken: token, action: 'submit' })
});

// 4. Check if verification passed
if (response.allowed) {
  // ✅ Proceed to send email
  emailjs.send(...)
} else {
  // ❌ Block submission
  showError(response.reason)
}
```

### Backend Verification

```typescript
// 1. Receive token from frontend
const { recaptchaToken } = req.body;

// 2. Verify with Google API (using secret key)
const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  body: new URLSearchParams({
    secret: SECRET_KEY,  // ← Never exposed to frontend!
    response: recaptchaToken
  })
});

// 3. Check score (reCAPTCHA v3)
if (score >= 0.5 && success === true) {
  return { allowed: true };  // ✅ Human
} else {
  return { allowed: false }; // ❌ Bot
}
```

---

## 📊 Security Features

### ✅ What's Protected

| Feature | Implementation | Status |
|---------|---------------|--------|
| **Secret Key Hidden** | Stored in `.env.local`, never exposed | ✅ |
| **Score Validation** | Minimum 0.5 threshold (adjustable) | ✅ |
| **Action Matching** | Validates action='submit' | ✅ |
| **Rate Limiting** | 5 requests per minute per IP | ✅ |
| **Method Validation** | Only accepts POST | ✅ |
| **CORS Headers** | Configurable allowed origins | ✅ |
| **Error Handling** | Graceful degradation | ✅ |

### ⚠️ Rate Limiting Note

Current implementation uses **in-memory storage** (resets on cold start).

**For production, upgrade to:**
- **Vercel KV** (Redis): `https://vercel.com/docs/storage/vercel-kv`
- **Upstash Redis**: `https://upstash.com/`
- **Vercel Edge Config**: For simpler rate limiting

---

## 🧪 Testing

### Test with cURL

```bash
curl -X POST http://localhost:3000/api/verify-recaptcha \
  -H "Content-Type: application/json" \
  -d '{
    "recaptchaToken": "03AGdBq27...",
    "action": "submit"
  }'
```

### Expected Responses

**✅ Success (Human)**
```json
{
  "allowed": true,
  "score": 0.9,
  "action": "submit"
}
```

**❌ Failed (Bot)**
```json
{
  "allowed": false,
  "reason": "Suspicious activity detected (score: 0.2)"
}
```

**⚠️ Rate Limited**
```json
{
  "allowed": false,
  "reason": "Rate limit exceeded. Max 5 requests per minute."
}
```

---

## 🔑 reCAPTCHA v3 Keys

### Your Configuration

| Type | Key | Usage |
|------|-----|-------|
| **Site Key** (Public) | `6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh` | Frontend only |
| **Secret Key** (Private) | `6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR` | Backend only |

### ⚠️ Security Reminder

- ✅ **Site Key** → Can be public (in HTML, client-side JS)
- ❌ **Secret Key** → NEVER expose (must be in backend/env only)

---

## 🎯 Score Interpretation

| Score | Interpretation | Action |
|-------|---------------|--------|
| **0.9 - 1.0** | Very likely human | ✅ Allow |
| **0.5 - 0.8** | Probably human | ✅ Allow |
| **0.3 - 0.4** | Suspicious | ⚠️ Review |
| **0.0 - 0.2** | Very likely bot | ❌ Block |

Current threshold: **0.5** (adjustable in `verify-recaptcha.ts`)

---

## 📝 Frontend Integration

Already implemented in `Contact.tsx`:

```typescript
// 1. Generate token
const token = await grecaptcha.execute('SITE_KEY', { action: 'submit' });

// 2. Verify with backend
const result = await fetch('/api/verify-recaptcha', {
  method: 'POST',
  body: JSON.stringify({ recaptchaToken: token, action: 'submit' })
});

// 3. Check result
if (!result.allowed) {
  // Block submission, show error
  return;
}

// 4. Proceed with email sending
emailjs.send(...)
```

---

## 🚦 Production Checklist

- [ ] Add `RECAPTCHA_SECRET_KEY` to Vercel environment variables
- [ ] Update CORS origins to your production domain
- [ ] Implement Redis-based rate limiting (optional)
- [ ] Monitor logs for suspicious activity
- [ ] Test on staging environment first
- [ ] Set up alerts for high bot traffic
- [ ] Review reCAPTCHA admin console regularly

---

## 🐛 Troubleshooting

### Issue: "Server configuration error"
**Cause:** `RECAPTCHA_SECRET_KEY` not set
**Fix:** Add to `.env.local` and restart dev server

### Issue: "Rate limit exceeded"
**Cause:** Too many requests from same IP
**Fix:** Wait 1 minute or clear rate limit cache (restart server)

### Issue: "reCAPTCHA verification failed"
**Cause:** Invalid token or expired token (tokens expire after 2 minutes)
**Fix:** Ensure frontend generates fresh token before each request

### Issue: CORS error
**Cause:** Origin not allowed
**Fix:** CORS is handled automatically by Next.js App Router API routes

---

## 📚 Resources

- [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel KV (Redis)](https://vercel.com/docs/storage/vercel-kv)

---

## 🎓 Why This Architecture?

### ✅ Advantages

1. **Zero Infrastructure Management** - Vercel handles scaling
2. **Secure by Default** - Secret key never exposed
3. **Cost Effective** - Pay per execution (100k free executions/month)
4. **Global Edge Network** - Low latency worldwide
5. **Easy Deployment** - Git push = auto deploy

### 🎯 Perfect For

- Frontend-only applications (Next.js, React, Vue)
- Low to medium traffic websites
- No dedicated backend server
- Rapid prototyping and MVPs

---

**🔒 Security First. Always.**
