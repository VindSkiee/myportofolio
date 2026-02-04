# 🔍 reCAPTCHA Configuration Checker

## ⚠️ Common Error: "reCAPTCHA verification failed"

Jika Anda mendapat error ini, kemungkinan besar **localhost belum didaftarkan** di Google reCAPTCHA console.

---

## 🔧 Solusi: Tambahkan localhost ke Domain List

### Step 1: Buka reCAPTCHA Admin Console
https://www.google.com/recaptcha/admin/site/6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh

### Step 2: Klik "Settings" atau "Domains"

### Step 3: Tambahkan domain berikut:

```
localhost
127.0.0.1
```

**⚠️ PENTING:** reCAPTCHA v3 tidak perlu domain verification di development, tapi beberapa konfigurasi default mungkin memblokir localhost.

### Step 4: Save dan tunggu 1-2 menit

### Step 5: Restart dev server dan test lagi

---

## 🧪 Cara Test Manual (Jika Masih Error)

### Test 1: Cek Browser Console

Setelah submit form, lihat console:

```javascript
❌ reCAPTCHA verification failed: reCAPTCHA verification failed
Error details: ["invalid-input-secret", "timeout-or-duplicate"]
```

### Error Codes Explained

| Code | Meaning | Solution |
|------|---------|----------|
| `invalid-input-secret` | Secret key salah | Cek .env.local |
| `timeout-or-duplicate` | Token expired/reused | Token hanya valid 2 menit |
| `missing-input-secret` | Env var tidak dimuat | Restart dev server |
| `invalid-input-response` | Token format salah | Regenerate token |
| `bad-request` | Request format salah | Cek API payload |
| `hostname-mismatch` | Domain tidak terdaftar | Tambah localhost di console |

---

## 🔐 Verifikasi Environment Variable

### Cek .env.local

```bash
# Pastikan file ini ada di root project
cat .env.local

# Output harus:
RECAPTCHA_SECRET_KEY=6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

### Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

**⚠️ Next.js hanya load .env saat startup!**

---

## 🧪 Test API Langsung

### Test dengan Token Valid

1. Buka browser console di `http://localhost:3000`

2. Generate real token:

```javascript
grecaptcha.execute('6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh', { action: 'submit' })
  .then(token => {
    console.log('Token:', token);
    
    // Test API
    return fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recaptchaToken: token, action: 'submit' })
    });
  })
  .then(r => r.json())
  .then(data => console.log('Response:', data));
```

3. Lihat response di console

---

## 🎯 Expected Success Response

```json
{
  "allowed": true,
  "score": 0.9,
  "action": "submit"
}
```

## ❌ Error Response (Debug Info)

```json
{
  "allowed": false,
  "reason": "reCAPTCHA verification failed",
  "errors": ["invalid-input-secret"],
  "details": {
    "success": false,
    "error-codes": ["invalid-input-secret"]
  }
}
```

---

## 🔍 Troubleshooting Steps

### 1. Verify Secret Key

```bash
# Windows PowerShell
$env:RECAPTCHA_SECRET_KEY
# Harus output: 6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR
```

### 2. Verify Site Key (in layout.tsx)

```tsx
<Script
  src="https://www.google.com/recaptcha/api.js?render=6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh"
  strategy="lazyOnload"
/>
```

### 3. Check Keys Match

Site Key dan Secret Key harus dari **project yang sama** di reCAPTCHA console.

```
Site Key:    6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh  (Public - Frontend)
Secret Key:  6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR  (Private - Backend)
```

Kedua key harus dari site yang sama!

### 4. Test Without reCAPTCHA (Temporary)

Untuk isolate masalah, temporary disable verification:

```typescript
// In Contact.tsx, comment out verification
// if (recaptchaToken) {
//   ... verification code ...
// }

// Langsung send email
await emailjs.send(...)
```

Jika email terkirim tanpa verification, masalahnya di reCAPTCHA config.

---

## 🚀 Quick Fix Checklist

- [ ] Stop dev server (Ctrl+C)
- [ ] Check `.env.local` exists with correct secret key
- [ ] Restart dev server (`npm run dev`)
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Hard refresh page (Ctrl+F5)
- [ ] Open browser console (F12)
- [ ] Submit form and check error details
- [ ] Verify domains in reCAPTCHA console include localhost
- [ ] Test API endpoint directly with manual token

---

## 📞 Still Not Working?

Check server logs untuk melihat response dari Google API:

**Terminal output harus show:**
```
⚠️ reCAPTCHA verification failed: ["invalid-input-secret"]
Full Google response: {
  "success": false,
  "error-codes": ["invalid-input-secret"]
}
```

Ini akan memberikan clue spesifik apa yang salah.

---

## 🎓 Alternative: Test Mode

Jika untuk development testing, Anda bisa temporary gunakan **test keys** dari Google:

```
Site Key (Test):    6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret Key (Test):  6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

**⚠️ Test keys selalu return success, jangan gunakan di production!**

---

**Debug dengan console logs baru dan report hasil error codes yang muncul!** 🔍
