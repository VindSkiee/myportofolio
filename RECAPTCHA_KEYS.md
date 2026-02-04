# 🔑 reCAPTCHA Keys Configuration Helper

## Current Configuration: TEST KEYS (Development)

### Test Keys (Google Official - Always Pass)
```
Site Key:    6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret Key:  6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

**✅ Advantages:**
- No domain registration needed
- Works on localhost immediately
- Always returns success
- Perfect for development/testing

**⚠️ Warning:**
- Don't use in production!
- No actual bot protection

---

## Production Keys (Your vinnd.tech)

### Your Production Keys
```
Site Key:    6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh
Secret Key:  6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

**⚠️ Requirements:**
- Domains must be registered in reCAPTCHA console
- Add: `localhost`, `127.0.0.1`, `vinnd.tech`, `www.vinnd.tech`

---

## 🔄 How to Switch Keys

### For Development (Test Keys - Current)

**1. `.env.local`:**
```bash
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

**2. `src/app/layout.tsx`:**
```tsx
<Script
  src="https://www.google.com/recaptcha/api.js?render=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
  strategy="lazyOnload"
/>
```

**3. `src/components/contact/Contact.tsx`:**
```tsx
recaptchaToken = await window.grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action: 'submit' });
```

---

### For Production (Your Keys)

**IMPORTANT: Before deploying to Vercel, switch to production keys!**

**1. `.env.local`:**
```bash
RECAPTCHA_SECRET_KEY=6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

**2. `src/app/layout.tsx`:**
```tsx
<Script
  src="https://www.google.com/recaptcha/api.js?render=6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh"
  strategy="lazyOnload"
/>
```

**3. `src/components/contact/Contact.tsx`:**
```tsx
recaptchaToken = await window.grecaptcha.execute('6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh', { action: 'submit' });
```

**4. Vercel Environment Variables:**
```
RECAPTCHA_SECRET_KEY=6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

---

## 🚀 Quick Start (Test Keys - Current Setup)

### 1. Restart Dev Server
```bash
npm run dev
```

### 2. Test Form
- Go to: `http://localhost:3000/#contact`
- Fill and submit form
- Should work immediately!

### 3. Expected Console Output
```
✅ reCAPTCHA is ready and loaded successfully
✅ reCAPTCHA token generated: 03AGdBq27...
✅ Secret key loaded: 6LeIxAcTAAAA...
✅ reCAPTCHA verified | Score: 0.9 | Action: submit
✅ Email sent successfully
```

---

## 🔐 Production Deployment Checklist

Before `vercel --prod`:

- [ ] Update `.env.local` to production secret key
- [ ] Update `layout.tsx` script src to production site key
- [ ] Update `Contact.tsx` execute() to production site key
- [ ] Add production key to Vercel environment variables
- [ ] Register domains in reCAPTCHA console:
  - [ ] vinnd.tech
  - [ ] www.vinnd.tech
- [ ] Test on staging first
- [ ] Deploy to production

---

## 📋 Domain Registration Guide

### Step 1: Open reCAPTCHA Console
https://www.google.com/recaptcha/admin

### Step 2: Select Your Site
Click on site using key: `6Lflt1gsAAAAAL...`

### Step 3: Settings → Domains
Add these domains (one per line):
```
localhost
127.0.0.1
vinnd.tech
www.vinnd.tech
```

### Step 4: Save
Wait 1-2 minutes for propagation

### Step 5: Switch to Production Keys
Follow "For Production" steps above

---

## 🧪 Verify Setup

### Test Mode (Current)
```bash
# Should show test key
cat .env.local | grep RECAPTCHA

# Output:
RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

### Check What's Running
Open browser console and type:
```javascript
grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', { action: 'test' })
  .then(token => console.log('Token:', token));
```

If it returns a token, reCAPTCHA is working!

---

## 🎯 Current Status

**✅ Configuration: TEST MODE**
- Using Google's official test keys
- No domain registration needed
- Works on localhost immediately
- Perfect for development

**Next Step:**
1. Restart dev server
2. Test form
3. When ready for production, switch to production keys

---

**Remember: Test keys are for development only. Always switch to production keys before deploying!** 🚀
