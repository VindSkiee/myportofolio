# 🎯 Quick Start Guide - reCAPTCHA Serverless Backend

## ⚡ 3 Steps to Get Running

### Step 1: Install Dependencies

```bash
npm install --save-dev @vercel/node
```

### Step 2: Environment Variables

File `.env.local` sudah dibuat otomatis dengan:
```
RECAPTCHA_SECRET_KEY=6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Testing

### 1. Open your contact form
Go to: `http://localhost:3000/#contact`

### 2. Fill form and submit

### 3. Check browser console

You should see:
```
✅ reCAPTCHA token generated: 03AGdBq27...
✅ reCAPTCHA verified by backend | Score: 0.9
```

---

## 🚀 Deploy to Vercel

### Option A: Vercel CLI

```bash
vercel --prod
```

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Import to Vercel
3. Add environment variable:
   - Key: `RECAPTCHA_SECRET_KEY`
   - Value: `6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR`
4. Deploy!

---

## 📊 What Changed

### New Files Created
✅ `src/app/api/verify-recaptcha/route.ts` - API Route Handler
✅ `api/README.md` - API documentation (deprecated)
✅ `.env.local` - Secret key storage
✅ `.env.example` - Template for others
✅ `RECAPTCHA_BACKEND.md` - Full documentation
✅ `QUICKSTART.md` - This file

### Modified Files
✅ `src/components/contact/Contact.tsx` - Now calls backend API

---

## 🔍 How to Verify It's Working

### Frontend Console Logs

✅ Good:
```
✅ reCAPTCHA is ready and loaded successfully
✅ reCAPTCHA token generated: 03AGdBq27...
✅ reCAPTCHA verified by backend | Score: 0.9
```

❌ Bad:
```
⚠️ reCAPTCHA script not detected
❌ Backend verification error
```

### Backend Logs (Vercel Dashboard)

In production, check Vercel Function logs for:
```
✅ reCAPTCHA verified | Score: 0.9 | Action: submit | IP: 123.45.67.89
```

---

## 🐛 Common Issues

### "Cannot find module '@vercel/node'"
**Fix:** Run `npm install --save-dev @vercel/node`

### "Server configuration error"
**Fix:** Check `.env.local` exists and has `RECAPTCHA_SECRET_KEY`

### "404 Not Found" when calling API
**Fix:** Make sure you're using `/api/verify-recaptcha` (no `.ts` extension)

### CORS error in browser
**Fix:** Update `Access-Control-Allow-Origin` in `api/verify-recaptcha.ts`

---

## 📚 Full Documentation

For complete details, see: [RECAPTCHA_BACKEND.md](./RECAPTCHA_BACKEND.md)

---

**Ready to go! 🚀**

Test locally first, then deploy to production with confidence.
