# 🚀 Panduan Deploy ke Vercel

## ✅ Perbaikan Yang Sudah Dilakukan

1. ✅ **reCAPTCHA keys** sudah diganti ke production keys
2. ✅ **EmailJS credentials** dipindah ke environment variables
3. ✅ **vercel.json** sudah disederhanakan
4. ✅ **Security** - Keys tidak hardcoded di code

---

## 📋 Langkah-Langkah Deploy

### 1️⃣ Persiapan Repository

**A. Commit Changes**
```bash
git add .
git commit -m "chore: prepare for production deployment with env variables"
git push origin main
```

**B. Pastikan .env.local Tidak Ter-commit**
```bash
# Check .gitignore sudah ada:
cat .gitignore | grep ".env*.local"
# Seharusnya muncul: .env*.local
```

---

### 2️⃣ Deploy ke Vercel

**A. Via Vercel CLI (Recommended)**
```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

**B. Via Vercel Dashboard (Alternative)**
1. Buka: https://vercel.com/new
2. Import Git Repository
3. Pilih repository Anda
4. Klik **Deploy** (jangan set env vars dulu)

---

### 3️⃣ Set Environment Variables di Vercel

**🔑 Variables Yang Harus Di-Set:**

#### Cara 1: Via Vercel Dashboard (UI)

1. Buka project di Vercel: https://vercel.com/dashboard
2. Klik project Anda
3. Klik **Settings** → **Environment Variables**
4. Tambahkan variable berikut **SATU PER SATU**:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `RECAPTCHA_SECRET_KEY` | `6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR` | ✅ Production, ✅ Preview, ✅ Development |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_77ex519` | ✅ Production, ✅ Preview, ✅ Development |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_eveuy4h` | ✅ Production, ✅ Preview, ✅ Development |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `F3KRRNWroKN2m4y0g` | ✅ Production, ✅ Preview, ✅ Development |

5. Klik **Save** setiap kali menambahkan variable

#### Cara 2: Via Vercel CLI

```bash
# Set production environment variables
vercel env add RECAPTCHA_SECRET_KEY production
# Paste: 6Lflt1gsAAAAAKq1ib_a7Ubl1FrD8dWrC_jE6seR

vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID production
# Paste: service_77ex519

vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID production
# Paste: template_eveuy4h

vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY production
# Paste: F3KRRNWroKN2m4y0g
```

---

### 4️⃣ Redeploy Setelah Set Environment Variables

**⚠️ PENTING:** Environment variables hanya aktif setelah redeploy!

**A. Via Vercel Dashboard**
1. Klik **Deployments** tab
2. Klik **...** (three dots) pada deployment terakhir
3. Klik **Redeploy**
4. Pastikan **Use existing Build Cache** dimatikan
5. Klik **Redeploy**

**B. Via Vercel CLI**
```bash
vercel --prod --force
```

**C. Via Git Push (Otomatis)**
```bash
git commit --allow-empty -m "trigger: redeploy with env vars"
git push origin main
```

---

### 5️⃣ Verifikasi Domain di Google reCAPTCHA

1. Buka: https://www.google.com/recaptcha/admin
2. Pilih site key: `6Lflt1gsAAAAAL-eFb-bGwQhNibsLn3c5q7AJguh`
3. Klik **Settings** (⚙️ icon)
4. Di bagian **Domains**, tambahkan:
   ```
   localhost
   127.0.0.1
   vinnd.tech
   www.vinnd.tech
   your-project.vercel.app
   ```
5. Klik **Save**

---

### 6️⃣ Testing Production

**A. Test reCAPTCHA**
1. Buka: https://your-project.vercel.app
2. Scroll ke Contact Form
3. Buka Browser Console (F12)
4. Submit form
5. Check console logs:
   ```
   ✅ reCAPTCHA token generated: ...
   ✅ reCAPTCHA verified by backend | Score: 0.9
   ```

**B. Test Email Sending**
1. Fill form dengan data valid
2. Submit
3. Check email inbox
4. Should receive email from your form

---

## 🔍 Troubleshooting

### ❌ Error: "reCAPTCHA verification failed"
**Solusi:**
1. Check environment variable `RECAPTCHA_SECRET_KEY` sudah benar
2. Pastikan domain sudah ditambahkan di reCAPTCHA console
3. Check console log di browser untuk detail error

### ❌ Error: "Server configuration error"
**Solusi:**
1. Environment variable belum di-set atau salah nama
2. Lakukan redeploy setelah set env vars
3. Check Vercel logs: `vercel logs`

### ❌ Error: "Email sending failed" atau "ERR_CONNECTION_RESET"
**Solusi:**
1. Check EmailJS credentials di environment variables:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
2. Pastikan EmailJS service masih active di: https://dashboard.emailjs.com/
3. Check EmailJS account quota (free tier: 200 emails/month)
4. Verify template ID exists dan sudah di-save
5. Test EmailJS dari dashboard terlebih dahulu
6. Check browser console untuk detail error
7. Retry mechanism akan otomatis mencoba 2x jika gagal

### ❌ Error: "Failed to fetch"
**Solusi:**
1. Network connectivity issue - check internet connection
2. Firewall atau ad blocker blocking EmailJS
3. Try dari browser/network yang berbeda
4. EmailJS API mungkin down - check status: https://status.emailjs.com/

### ❌ Error: "Invalid site key"
**Solusi:**
1. Pastikan site key di `layout.tsx` sudah production key
2. Check domain di reCAPTCHA console
3. Clear browser cache

---

## 📊 Check Environment Variables

### Via Vercel Dashboard
Settings → Environment Variables → Lihat semua variables

### Via Vercel CLI
```bash
# List all environment variables
vercel env ls

# Pull env vars to local
vercel env pull .env.vercel
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Deploy to production
vercel --prod

# Force redeploy (ignore cache)
vercel --prod --force

# View deployment logs
vercel logs

# List environment variables
vercel env ls

# Pull environment variables
vercel env pull

# Rollback to previous deployment
vercel rollback
```

---

## ✨ Post-Deploy Checklist

- [ ] Environment variables sudah di-set di Vercel
- [ ] Project sudah di-redeploy setelah set env vars
- [ ] Domain sudah ditambahkan di reCAPTCHA console
- [ ] Test contact form di production
- [ ] Check browser console tidak ada error
- [ ] Test email diterima dengan benar
- [ ] Test rate limiting bekerja (submit 4x dalam 1 menit)
- [ ] Test reCAPTCHA score logging di console

---

## 📞 Resources

- Vercel Dashboard: https://vercel.com/dashboard
- reCAPTCHA Console: https://www.google.com/recaptcha/admin
- EmailJS Dashboard: https://dashboard.emailjs.com/
- Vercel Docs: https://vercel.com/docs

---

✅ **Selesai! Project Anda siap production.**
