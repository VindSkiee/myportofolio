# 🔧 reCAPTCHA Browser Error - Troubleshooting Guide

## Error Encountered
```
⚠️ reCAPTCHA verification failed: [ 'browser-error' ]
Hostname from Google: undefined
```

---

## 🔍 What is "browser-error"?

Google returns `browser-error` when ada masalah dengan konfigurasi reCAPTCHA keys atau domain registration. Ini bukan masalah dengan browser user, tapi konfigurasi developer.

---

## 🎯 Root Causes & Solutions

### 1. **Site Key & Secret Key Mismatch** ⭐ MOST COMMON

**Masalah:**  
Site key (frontend) dan Secret key (backend) tidak matching atau berasal dari key pair yang berbeda.

**Cek:**
```bash
# Check frontend key
grep NEXT_PUBLIC_RECAPTCHA_SITE_KEY .env.local

# Check backend key  
grep RECAPTCHA_SECRET_KEY .env.local
```

**Solusi:**
1. Login ke [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Pilih site Anda
3. Di bagian "Keys", copy:
   - **Site key** → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret key** → `RECAPTCHA_SECRET_KEY`
4. Pastikan keduanya dari site yang SAMA
5. Update `.env.local`:
   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   RECAPTCHA_SECRET_KEY=6Lfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. Restart dev server: `npm run dev`

---

### 2. **Using Test Keys in Wrong Environment**

**Masalah:**  
Menggunakan test keys di production atau production keys di localhost.

**Test Keys (provided by Google):**
```
Site Key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
Secret Key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
```

**Solusi:**
- ✅ Test keys: HANYA untuk testing, TIDAK untuk production
- ✅ Production keys: Harus register domain di Google reCAPTCHA
- ✅ Development: Buat key baru dan tambahkan `localhost` ke domains

**Cara membuat key untuk localhost:**
1. Buka [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/create)
2. Pilih **reCAPTCHA v3**
3. Di "Domains", tambahkan:
   - `localhost`
   - Domain production Anda
4. Submit
5. Copy keys ke `.env.local`

---

### 3. **Domain Not Registered**

**Masalah:**  
Domain tempat Anda running app tidak terdaftar di reCAPTCHA key settings.

**Cek Registered Domains:**
1. Login ke [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Klik site Anda
3. Lihat "Domains" section

**Expected untuk Development:**
```
✓ localhost
✓ 127.0.0.1
```

**Expected untuk Production:**
```
✓ yourdomain.com
✓ www.yourdomain.com
```

**Solusi:**
1. Tambahkan domain yang missing
2. Click "Save"
3. Wait 1-2 minutes untuk propagasi
4. Restart application

---

### 4. **Wrong reCAPTCHA Version**

**Masalah:**  
Using v2 keys with v3 implementation (or vice versa).

**Check Version:**
- v2 keys: Score-based, requires user interaction
- **v3 keys: Silent, score-based (0.0-1.0)** ← You're using this

**Solusi:**
Ensure keys are **reCAPTCHA v3** type:
1. Check at [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Type should be **"Score based (v3)"**
3. If wrong, create new v3 keys

---

### 5. **Hostname Undefined**

**Masalah:**  
`Hostname from Google: undefined`

**Common Causes:**
- Development environment (normal behavior)
- Request from non-HTTP source
- Localhost issues

**Solusi:**
```typescript
// In verify-recaptcha/route.ts
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Development: Allow undefined hostname
if (!data.hostname && IS_DEVELOPMENT) {
  console.log('ℹ️ Hostname undefined (normal in development)');
  // Continue processing...
}
```

**Already implemented** ✅ in updated code

---

## 🧪 Testing Your Fix

### Test 1: Verify Keys Match
```bash
# PowerShell
$env:NEXT_PUBLIC_RECAPTCHA_SITE_KEY = (Get-Content .env.local | Select-String "NEXT_PUBLIC_RECAPTCHA_SITE_KEY").ToString().Split("=")[1]
$env:RECAPTCHA_SECRET_KEY = (Get-Content .env.local | Select-String "RECAPTCHA_SECRET_KEY" | Select-String -NotMatch "NEXT_PUBLIC").ToString().Split("=")[1]

Write-Host "Site Key: $($env:NEXT_PUBLIC_RECAPTCHA_SITE_KEY.Substring(0,15))..."
Write-Host "Secret Key: $($env:RECAPTCHA_SECRET_KEY.Substring(0,15))..."
```

Both should start with same prefix (e.g., `6Lflt1gsAAA...`)

### Test 2: Check Console Logs
After fix, you should see:
```
✅ reCAPTCHA verified by backend | Score: 0.9 | Action: submit | Hostname: localhost
```

NOT:
```
❌ BROWSER-ERROR detected! This usually means...
```

### Test 3: Submit Contact Form
```javascript
// In browser console
document.querySelector('input[name="name"]').value = 'Test';
document.querySelector('input[name="email"]').value = 'test@example.com';
document.querySelector('textarea[name="message"]').value = 'Test message with more than 10 characters';
document.querySelector('button[type="submit"]').click();

// Check console for success
```

---

## 🔄 Step-by-Step Recovery

### If Starting Fresh:

1. **Delete old keys** (if any confusion):
   ```bash
   # Backup current .env.local
   cp .env.local .env.local.backup
   ```

2. **Create new reCAPTCHA v3 site**:
   - Go to https://www.google.com/recaptcha/admin/create
   - Label: "My Portfolio - Dev & Prod"
   - Type: **reCAPTCHA v3**
   - Domains:
     ```
     localhost
     yourdomain.com
     www.yourdomain.com
     ```
   - Submit

3. **Copy both keys**:
   ```env
   # .env.local
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf_NEW_SITE_KEY_HERE
   RECAPTCHA_SECRET_KEY=6Lf_NEW_SECRET_KEY_HERE
   ```

4. **Restart everything**:
   ```bash
   # Kill all node processes
   taskkill /F /IM node.exe
   
   # Clean build
   rm -rf .next
   
   # Fresh start
   npm run dev
   ```

5. **Test immediately**:
   - Go to http://localhost:3000
   - Submit contact form
   - Check console logs

---

## 🎯 Expected Console Output (Success)

### Frontend:
```
✅ reCAPTCHA is ready and loaded successfully
✅ reCAPTCHA token generated: 03AGdBq26...
✅ reCAPTCHA verified by backend | Score: 0.9
📧 Sending email via server API...
✅ Email sent successfully via server!
```

### Backend (API logs):
```
✅ Secret key loaded: 6Lflt1gsAAAAAKq...
📥 Received request body: { hasToken: true, tokenLength: 293, action: 'submit' }
✅ reCAPTCHA verified | Score: 0.9 | Action: submit | Hostname: localhost | IP: ::ffff:172.24.208.1
```

---

## 🚫 What NOT To Do

❌ Don't use test keys in production  
❌ Don't mix v2 and v3 keys  
❌ Don't share secret key publicly  
❌ Don't forget to add localhost to domains  
❌ Don't use site key as secret key (they're different!)

---

## 📞 Still Not Working?

### Diagnostic Checklist:

- [ ] Both keys are from the SAME reCAPTCHA site
- [ ] Keys are reCAPTCHA v3 type
- [ ] Domain is registered (localhost for dev)
- [ ] `.env.local` is in project root
- [ ] Dev server restarted after env changes
- [ ] Browser cache cleared
- [ ] No typos in env variable names
- [ ] Keys have no extra spaces/newlines

### Debug Mode:

Add to `.env.local`:
```env
NODE_ENV=development
```

Check logs for:
```
Environment: development
ℹ️ Hostname undefined (common in development)
```

### Last Resort:

1. Delete ALL reCAPTCHA-related env vars
2. Create completely new reCAPTCHA site
3. Use fresh keys
4. Test with browser-error

---

## 📚 Additional Resources

- [Google reCAPTCHA v3 Docs](https://developers.google.com/recaptcha/docs/v3)
- [Common Error Codes](https://developers.google.com/recaptcha/docs/verify#error_code_reference)
- [Domain Registration](https://developers.google.com/recaptcha/docs/domain_validation)

---

## ✅ Success Indicators

You've fixed the issue when you see:
1. ✅ No `browser-error` in logs
2. ✅ Score returned (e.g., 0.9)
3. ✅ Hostname shows (or undefined in dev is OK)
4. ✅ Form submits successfully
5. ✅ Email sent

---

**Problem:** `browser-error`  
**Most Likely Cause:** Key mismatch  
**Quick Fix:** Verify both keys from same site  
**Time to Fix:** 5 minutes

Good luck! 🚀
