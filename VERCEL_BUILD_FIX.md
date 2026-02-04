# 🔧 Troubleshooting Vercel Build Error

## Error: EEXIST file already exists

```
EEXIST: file already exists, symlink 'send-email.func' -> '/vercel/output/functions/api/verify-recaptcha.func'
```

---

## ✅ Solusi Yang Sudah Diterapkan

✅ **API route di-rename untuk menghindari konflik:**
- `src/app/api/send-email/` → `src/app/api/contact/`
- Endpoint sekarang: `/api/contact`
- `vercel.json` disederhanakan

✅ **Changes sudah di-push ke Git:**
```bash
git commit -m "fix: rename send-email to contact API to resolve Vercel symlink conflict"
git push origin main
```

---

## 🔍 Penyebab

Error ini terjadi karena:
1. **Build cache issue** - Vercel cache dari deployment sebelumnya konflik
2. **Symlink conflict** - Build process mencoba membuat symlink yang sudah ada
3. **Function naming conflict** - Dua API routes sharing resource

---

## ✅ Solusi

### **1. Force Redeploy Tanpa Cache (RECOMMENDED)**

Di Vercel Dashboard:
1. Klik **Deployments**
2. Klik **...** (three dots) pada deployment terakhir
3. Klik **Redeploy**
4. ⚠️ **UNCHECK** "Use existing Build Cache"
5. Klik **Redeploy**

### **2. Via Vercel CLI**

```bash
# Install Vercel CLI jika belum
npm i -g vercel

# Login
vercel login

# Force redeploy tanpa cache
vercel --prod --force
```

### **3. Via Git (Otomatis Trigger Rebuild)**

```bash
# Commit perubahan terbaru
git add .
git commit -m "fix: force rebuild to clear cache"
git push origin main
```

---

## 📝 Checklist Sebelum Redeploy

- [x] File `vercel.json` sudah diupdate dengan function config
- [x] Environment variables sudah di-set di Vercel:
  - `RECAPTCHA_SECRET_KEY`
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `EMAILJS_PRIVATE_KEY`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- [x] API routes struktur benar:
  - ✅ `src/app/api/verify-recaptcha/route.ts`
  - ✅ `src/app/api/send-email/route.ts`

---

## 🧪 Test Lokal Dulu

Sebelum deploy, pastikan berjalan lokal:

```bash
# Stop existing dev server
# Then restart
npm run dev
```

Test kedua endpoints:

**1. Test reCAPTCHA API:**
```bash
curl http://localhost:3001/api/verify-recaptcha
```

**2. Test Email API:**
```bash
curl http://localhost:3001/api/send-email
```

---

## 🚀 Deployment Steps

### **Step 1: Commit Changes**
```bash
git add .
git commit -m "feat: add server-side email API with vercel config"
git push origin main
```

### **Step 2: Verify Environment Variables**

Di Vercel Dashboard → Settings → Environment Variables:

| Variable | Set? |
|----------|------|
| `RECAPTCHA_SECRET_KEY` | ✅ |
| `EMAILJS_SERVICE_ID` | ✅ |
| `EMAILJS_TEMPLATE_ID` | ✅ |
| `EMAILJS_PRIVATE_KEY` | ⚠️ Check |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | ✅ |

### **Step 3: Force Redeploy**
- Uncheck "Use existing Build Cache"
- Click Redeploy

### **Step 4: Monitor Build Logs**
Watch build logs untuk memastikan tidak ada error.

### **Step 5: Test Production**
1. Buka production URL
2. Test contact form
3. Check browser console
4. Verify email received

---

## ⚠️ Jika Masih Error

### **A. Delete & Recreate Deployment**

1. Di Vercel Dashboard
2. Settings → Advanced
3. Delete Project
4. Import repository lagi

### **B. Check API Route Conflicts**

Pastikan tidak ada duplikat atau naming conflict:
```bash
# List all API routes
ls src/app/api/*/route.ts
```

Should output:
```
src/app/api/send-email/route.ts
src/app/api/verify-recaptcha/route.ts
```

### **C. Vercel Support**

Jika masih gagal, contact Vercel support:
- https://vercel.com/support
- Include build logs dan error message

---

## 📊 Verify Deployment Success

Setelah deploy berhasil:

```bash
# Test reCAPTCHA API
curl https://your-domain.vercel.app/api/verify-recaptcha

# Should return:
# {"service":"reCAPTCHA v3 Verification API","method":"POST only","status":"operational"}
```

```bash
# Test Email API
curl https://your-domain.vercel.app/api/send-email

# Should return:
# {"service":"Server-Side Email Sending API","method":"POST only","status":"operational","configured":true}
```

---

## ✅ Success Indicators

Deploy berhasil jika:
- ✅ Build complete tanpa error
- ✅ API routes accessible (GET requests return info)
- ✅ Contact form submit works
- ✅ Email diterima
- ✅ No console errors

---

## 📞 Resources

- Vercel Functions Docs: https://vercel.com/docs/functions
- Build Troubleshooting: https://vercel.com/docs/deployments/troubleshoot-a-build
- Support: https://vercel.com/support
