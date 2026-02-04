# 🚨 Quick Fix: reCAPTCHA browser-error

## Problem
```
⚠️ reCAPTCHA verification failed: [ 'browser-error' ]
```

## 5-Minute Fix

### 1. Check Keys Match
```bash
# Open .env.local and verify:
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf...  ← From SAME site
RECAPTCHA_SECRET_KEY=6Lf...            ← From SAME site
```

### 2. Verify Keys Are v3
Go to: https://www.google.com/recaptcha/admin
- Check type: Should be **"Score based (v3)"**
- Not v2 or checkbox

### 3. Check Domain Registered
In reCAPTCHA admin → Your site → Domains:
```
✓ localhost        ← For development
✓ yourdomain.com   ← For production
```

### 4. Create New Keys (If Confused)
https://www.google.com/recaptcha/admin/create
- Type: **reCAPTCHA v3**
- Domains: `localhost` + your production domain
- Copy BOTH keys to `.env.local`

### 5. Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Test
Submit contact form → Should see:
```
✅ reCAPTCHA verified | Score: 0.9
```

## Still Failing?

### Most Common Mistakes:
1. ❌ Using v2 keys with v3 code
2. ❌ Site key and secret key from different sites
3. ❌ Forgot to add `localhost` to domains
4. ❌ Using test keys in production
5. ❌ Typo in env variable names

### Quick Diagnostic:
```javascript
// In browser console
console.log(window.grecaptcha ? '✓ reCAPTCHA loaded' : '✗ Not loaded');
```

## Documentation
Full guide: [RECAPTCHA_BROWSER_ERROR.md](RECAPTCHA_BROWSER_ERROR.md)

---

**TL;DR:** Make sure site key and secret key are from the SAME reCAPTCHA v3 site, and `localhost` is in registered domains.
