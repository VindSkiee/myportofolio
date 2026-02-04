# 🔒 Security Implementation Documentation

## Overview
Sistem keamanan komprehensif untuk melindungi aplikasi dari berbagai jenis serangan seperti spam, bot attacks, DDoS, dan abuse.

---

## 🛡️ Security Features Implemented

### 1. **Cache-Control Headers (No-Store)**
**Location:** All API routes + Middleware

**Implementation:**
```typescript
'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
'Pragma': 'no-cache'
'Expires': '0'
```

**Purpose:**
- Mencegah caching response sensitif
- Memastikan setiap request diproses fresh
- Menghindari replay attacks dari cached responses

**Files Modified:**
- `src/middleware.ts` - Global cache control untuk API routes
- `src/app/api/contact/route.ts` - Semua responses
- `src/app/api/verify-recaptcha/route.ts` - Semua responses

---

### 2. **Rate Limiting (Vercel Edge Middleware)**
**Location:** `src/middleware.ts`

**Configuration:**
- **Global Rate Limit:** 10 requests per minute per IP
- **API Rate Limit:** 5 API calls per minute per IP
- **Window:** 60 seconds (rolling window)

**Features:**
- IP-based tracking
- Automatic cleanup on cold start
- Rate limit headers in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
  - `Retry-After`

**Response (429):**
```json
{
  "allowed": false,
  "reason": "Rate limit exceeded. Try again in X seconds.",
  "error": "Too Many Requests"
}
```

---

### 3. **Enhanced reCAPTCHA v3 Validation**
**Location:** `src/app/api/verify-recaptcha/route.ts`

#### **Validation Checks:**

##### a) **Score Validation**
- Minimum score: `0.5` (configurable)
- Scores below threshold = rejected
- Bot detection based on user behavior

##### b) **Action Validation**
- Allowed actions: `['submit', 'contact']`
- Action mismatch = rejected
- Prevents replay attacks

##### c) **Hostname Validation** ⚠️ **CRITICAL**
- Allowed hostnames:
  ```typescript
  ['localhost', 'myportofolio-nine.vercel.app', 'www.myportofolio-nine.vercel.app']
  ```
- **IMPORTANT:** Update dengan domain production Anda!
- Prevents external abuse from other domains

**Update Required:**
```typescript
// src/app/api/verify-recaptcha/route.ts (line ~30)
const ALLOWED_HOSTNAMES = [
  'localhost',
  'your-actual-domain.com',          // ← Ganti dengan domain Anda
  'www.your-actual-domain.com',      // ← Ganti dengan domain Anda
  'myportofolio-nine.vercel.app'     // ← Atau domain Vercel Anda
];
```

---

### 4. **Abuse Logging System**
**Location:** `src/app/api/verify-recaptcha/route.ts` & `src/middleware.ts`

**What's Logged:**
- ✅ IP address (anonymized in production)
- ✅ Timestamp
- ✅ Abuse reason
- ✅ User-Agent
- ✅ Request path
- ✅ Validation details (score, action, hostname)
- ❌ **NO sensitive data** (email, messages, passwords)

**Logged Events:**
1. Rate limit exceeded
2. Invalid tokens
3. Low reCAPTCHA scores
4. Action mismatches
5. Hostname violations
6. reCAPTCHA verification failures

**Example Log:**
```
🚨 ABUSE DETECTED [2026-02-05T10:30:45.123Z]
   IP: 192.168.1.100
   Reason: Low reCAPTCHA score - possible bot
   Details: {
     "score": 0.3,
     "threshold": 0.5,
     "action": "submit",
     "hostname": "localhost"
   }
```

---

### 5. **Global Security Headers**
**Location:** `src/middleware.ts`

**Headers Applied:**

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer control |
| `Permissions-Policy` | `camera=(), microphone=()...` | Disable unnecessary features |
| `Content-Security-Policy` | (see below) | Content restrictions |

**Content Security Policy (CSP):**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://cdn.emailjs.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
connect-src 'self' https://api.emailjs.com https://www.google.com;
frame-src 'self' https://www.google.com;
object-src 'none';
base-uri 'self';
form-action 'self';
```

---

### 6. **Honeypot Field**
**Location:** `src/components/contact/Contact.tsx`

**Implementation:**
```tsx
<div 
  style={{
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    tabIndex: -1,
  }} 
  aria-hidden="true"
>
  <label htmlFor="honeypot_field">Leave this field empty</label>
  <input
    type="text"
    id="honeypot_field"
    name="honeypot"
    tabIndex={-1}
    autoComplete="off"
    value={formData.honeypot}
    onChange={handleChange}
  />
</div>
```

**How It Works:**
- Hidden from human users (visually and from screen readers)
- Visible to bots in HTML source
- If filled → silently reject (no error message to bot)
- Zero impact on UX

**Validation:**
```typescript
// Silent rejection for bots
if (formData.honeypot) {
  console.warn("Bot detected via honeypot");
  return; // No error message
}
```

---

## 🚀 Deployment Checklist

### Before Deploying to Production:

1. **Update Allowed Hostnames:**
   ```typescript
   // src/app/api/verify-recaptcha/route.ts
   const ALLOWED_HOSTNAMES = [
     'your-production-domain.com',
     'www.your-production-domain.com'
   ];
   ```

2. **Verify Environment Variables:**
   - ✅ `RECAPTCHA_SECRET_KEY`
   - ✅ `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - ✅ `EMAILJS_SERVICE_ID`
   - ✅ `EMAILJS_TEMPLATE_ID`
   - ✅ `EMAILJS_PRIVATE_KEY`
   - ✅ `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

3. **Test Rate Limiting:**
   ```bash
   # Test dengan curl atau Postman
   for i in {1..6}; do curl -X POST https://your-domain.com/api/contact; done
   # Request ke-6 harus return 429
   ```

4. **Test reCAPTCHA:**
   - Submit form normal → should work
   - Use low score token → should reject
   - Use different action → should reject

5. **Monitor Logs:**
   - Check Vercel logs for abuse attempts
   - Monitor rate limit triggers
   - Watch for suspicious patterns

---

## 📊 Security Monitoring

### Where to Check Logs:

1. **Vercel Dashboard:**
   - Go to your project
   - Click "Functions" or "Logs"
   - Filter by "Warning" to see abuse attempts

2. **Console Logs Format:**
   ```
   🚨 SECURITY ALERT [timestamp]
      IP: xxx.xxx.xxx.xxx
      Path: /api/contact
      Reason: Rate limit exceeded
      User-Agent: Mozilla/5.0...
   ```

3. **What to Monitor:**
   - High rate limit triggers from same IP
   - Low reCAPTCHA scores patterns
   - Hostname violations (external sites using your API)
   - Action mismatches (replay attacks)
   - Honeypot triggers (bot activity)

---

## 🔧 Configuration Options

### Adjust Rate Limits:
```typescript
// src/middleware.ts
const RATE_LIMIT_WINDOW = 60000; // milliseconds
const MAX_REQUESTS_PER_WINDOW = 10; // requests
const MAX_API_REQUESTS = 5; // API calls
```

### Adjust reCAPTCHA Score:
```typescript
// src/app/api/verify-recaptcha/route.ts
const MINIMUM_SCORE = 0.5; // 0.0 (bot) to 1.0 (human)
```

### Add More Allowed Actions:
```typescript
// src/app/api/verify-recaptcha/route.ts
const ALLOWED_ACTIONS = ['submit', 'contact', 'newsletter'];
```

---

## 🧪 Testing

### Test Rate Limiting:
```bash
# PowerShell
for ($i=1; $i -le 6; $i++) { 
  Invoke-WebRequest -Uri "http://localhost:3000/api/contact" -Method POST
}
```

### Test Honeypot:
```javascript
// Fill honeypot in browser console
document.querySelector('input[name="honeypot"]').value = 'bot';
// Submit form → should silently fail
```

### Test reCAPTCHA Validation:
1. Submit normal → ✅ Should pass
2. Use test key with low score → ❌ Should reject
3. Change action in code → ❌ Should reject

---

## 📝 Maintenance

### Regular Tasks:

1. **Weekly:**
   - Review abuse logs
   - Check for new attack patterns
   - Adjust rate limits if needed

2. **Monthly:**
   - Update ALLOWED_HOSTNAMES if domain changes
   - Review and tune MINIMUM_SCORE
   - Check for false positives

3. **After Traffic Spikes:**
   - Analyze abuse attempts
   - Adjust thresholds if necessary
   - Update blocked patterns

---

## 🆘 Troubleshooting

### "Rate limit exceeded" for legitimate users:
- Increase `MAX_API_REQUESTS` or `MAX_REQUESTS_PER_WINDOW`
- Check if VPN/proxy causing IP conflicts

### "Request from unauthorized domain":
- Verify domain in `ALLOWED_HOSTNAMES`
- Check if subdomain needs to be added

### reCAPTCHA always fails:
- Verify `RECAPTCHA_SECRET_KEY` matches site key
- Check hostname validation
- Ensure action matches in frontend/backend

### Honeypot blocking real users:
- Check if autocomplete filling the field
- Verify field is properly hidden
- Test with multiple browsers

---

## 📚 Additional Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)
- [OWASP Security Guidelines](https://owasp.org/www-project-web-security-testing-guide/)

---

## ⚠️ Important Notes

1. **ALLOWED_HOSTNAMES** harus diupdate dengan domain production Anda
2. Rate limiting menggunakan in-memory storage (reset on cold start)
3. Untuk production scale, consider:
   - Redis untuk rate limiting
   - Database untuk audit logs
   - Advanced monitoring (Sentry, LogRocket, etc.)
4. Jangan log data sensitif (passwords, tokens, personal info)
5. Test semua fitur di staging sebelum production

---

## 🎯 Success Metrics

Sistem keamanan berhasil jika:
- ✅ Bot traffic berkurang >80%
- ✅ No legitimate users blocked
- ✅ Abuse attempts logged and blocked
- ✅ API performance tetap optimal
- ✅ No security headers errors in browser console

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
