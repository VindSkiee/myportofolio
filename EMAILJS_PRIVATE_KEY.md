# 🔑 Cara Mendapatkan EmailJS Private Key

## 📍 Langkah-Langkah

### 1. Login ke EmailJS Dashboard
Buka: https://dashboard.emailjs.com/

### 2. Akses API Keys Section
1. Klik **Account** di sidebar kiri
2. Pilih tab **API Keys**
3. Atau langsung ke: https://dashboard.emailjs.com/admin/account

### 3. Copy Private Key
Anda akan melihat 2 keys:
- **Public Key** (sudah Anda punya: `F3KRRNWroKN2m4y0g`)
- **Private Key** (rahasia, untuk server-side)

Copy **Private Key** tersebut.

### 4. Paste ke Environment Variables

#### Lokal (.env.local)
```env
EMAILJS_PRIVATE_KEY=your_private_key_here
```

#### Vercel
1. Dashboard → Project → Settings → Environment Variables
2. Tambahkan:
   - Name: `EMAILJS_PRIVATE_KEY`
   - Value: `<paste private key>`
   - Environment: Production, Preview, Development

---

## ✅ Verifikasi

Setelah set private key, test dengan:
```bash
# Restart dev server
npm run dev
```

Atau di production:
1. Redeploy Vercel
2. Test contact form
3. Check browser console dan Vercel logs

---

## 🔒 Security Notes

**JANGAN** share Private Key di:
- ❌ Git repository
- ❌ Public forums
- ❌ Client-side code
- ❌ Screenshot/documentation

**HARUS** store di:
- ✅ .env.local (gitignored)
- ✅ Vercel Environment Variables
- ✅ Secure password manager

---

## 🆘 Jika Private Key Tidak Muncul

### Kemungkinan 1: Free Plan Limitation
Private Key mungkin hanya available untuk paid plans. Jika tidak terlihat:

**Fallback ke Client-Side EmailJS:**

1. Revert Contact.tsx ke versi sebelumnya
2. Atau gunakan alternative email service:
   - Resend (https://resend.com) - 100 emails/day free
   - SendGrid (https://sendgrid.com) - 100 emails/day free
   - Nodemailer + Gmail SMTP

### Kemungkinan 2: Account Not Verified
Verify email Anda di EmailJS dashboard terlebih dahulu.

---

## 📧 Alternative: Menggunakan Resend

Jika EmailJS tidak work, coba Resend (lebih reliable):

### 1. Install Resend
```bash
npm install resend
```

### 2. Get API Key
https://resend.com/api-keys

### 3. Update API Route
Ganti isi `src/app/api/send-email/route.ts` dengan:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: 'your-email@gmail.com',
    subject: `Contact from ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true });
}
```

### 4. Set Environment Variable
```env
RESEND_API_KEY=re_...
```

---

## 📞 Support

- EmailJS Docs: https://www.emailjs.com/docs/
- Resend Docs: https://resend.com/docs
- Support: hello@emailjs.com
