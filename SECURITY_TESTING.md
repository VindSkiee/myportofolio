# 🧪 Security Testing Guide

## Quick Start - Test All Security Features

### Prerequisites
```bash
npm run dev
# Server running on http://localhost:3000
```

---

## 1️⃣ Test Rate Limiting

### Test Global Rate Limit (10 req/min)
```powershell
# PowerShell - Send 11 requests
for ($i=1; $i -le 11; $i++) { 
    Write-Host "Request $i" -ForegroundColor Cyan
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/contact" -Method GET -ErrorAction SilentlyContinue
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor $(if($response.StatusCode -eq 429){"Red"}else{"Green"})
}
```

**Expected Result:**
- ✅ Requests 1-10: Status 200
- ❌ Request 11: Status 429 (Rate Limited)

### Test API Rate Limit (5 req/min)
```powershell
# Send 6 POST requests
for ($i=1; $i -le 6; $i++) { 
    Write-Host "API Request $i" -ForegroundColor Yellow
    $body = @{
        name = "Test User"
        email = "test@example.com"
        message = "Test message for rate limiting"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" `
            -Method POST `
            -ContentType "application/json" `
            -Body $body
        Write-Host "Success: $($response.success)" -ForegroundColor Green
    } catch {
        Write-Host "Error: Rate Limited" -ForegroundColor Red
        $_.Exception.Response.StatusCode
    }
}
```

**Expected Result:**
- ✅ Requests 1-5: Success
- ❌ Request 6: 429 Error

---

## 2️⃣ Test reCAPTCHA Validation

### A. Test Score Validation
Open browser console on contact form:

```javascript
// Simulate low score (requires test environment)
// Production will reject scores < 0.5
```

### B. Test Action Validation
In [Contact.tsx](src/components/contact/Contact.tsx), temporarily change action:

```typescript
// Change this:
recaptchaToken = await window.grecaptcha.execute('YOUR_KEY', { action: 'submit' });

// To this (wrong action):
recaptchaToken = await window.grecaptcha.execute('YOUR_KEY', { action: 'wrong_action' });
```

**Expected Result:**
- ❌ Form submission rejected
- Console log: "Action mismatch"

### C. Test Hostname Validation

**⚠️ IMPORTANT: Update ALLOWED_HOSTNAMES first!**

File: [verify-recaptcha/route.ts](src/app/api/verify-recaptcha/route.ts)
```typescript
const ALLOWED_HOSTNAMES = [
  'localhost',  // ← Keep for development
  'your-production-domain.com',  // ← ADD YOUR DOMAIN
];
```

Test by submitting form:
- ✅ From localhost: Should work
- ❌ From unauthorized domain: Should reject

---

## 3️⃣ Test Honeypot Field

### Method 1: Browser DevTools
1. Open browser DevTools (F12)
2. Go to Elements tab
3. Find honeypot field:
   ```html
   <input type="text" id="honeypot_field" name="honeypot" />
   ```
4. In Console, run:
   ```javascript
   document.getElementById('honeypot_field').value = 'I am a bot';
   ```
5. Submit form

**Expected Result:**
- ❌ Form submission silently fails
- ✅ No error message shown (to confuse bots)
- Console log: "Bot detected via honeypot"

### Method 2: Manual Test
```javascript
// In browser console
const form = document.querySelector('form');
const honeypot = document.querySelector('input[name="honeypot"]');

// Fill honeypot
honeypot.value = 'bot test';

// Try to submit
form.dispatchEvent(new Event('submit', { cancelable: true }));

// Check console for "Bot detected via honeypot"
```

---

## 4️⃣ Test Security Headers

### Check Headers in Browser
1. Open Network tab (F12)
2. Submit contact form
3. Click on request to `/api/contact`
4. Check Response Headers:

**Should see:**
```
Cache-Control: no-store, no-cache, must-revalidate
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
Permissions-Policy: camera=(), microphone=()...
```

### Using curl
```powershell
# Check API headers
curl -I http://localhost:3000/api/contact

# Check middleware headers
curl -I http://localhost:3000/
```

---

## 5️⃣ Test Abuse Logging

### Trigger Abuse Logs

#### A. Exceed Rate Limit
```powershell
# Send multiple requests quickly
1..20 | ForEach-Object { Invoke-WebRequest http://localhost:3000/api/contact -Method GET }
```

**Check Console for:**
```
🚨 ABUSE DETECTED [timestamp]
   IP: 127.0.0.1
   Reason: Rate limit exceeded
```

#### B. Invalid reCAPTCHA Token
```bash
curl -X POST http://localhost:3000/api/verify-recaptcha \
  -H "Content-Type: application/json" \
  -d '{"recaptchaToken":"invalid_token"}'
```

**Check Console for:**
```
🚨 ABUSE DETECTED [timestamp]
   Reason: Invalid or missing token
```

#### C. Low Score Simulation
Submit form with test reCAPTCHA key (score < 0.5)

**Check Console for:**
```
🚨 ABUSE DETECTED [timestamp]
   Reason: Low reCAPTCHA score - possible bot
   Details: { "score": 0.3, "threshold": 0.5 }
```

---

## 6️⃣ Test Cache Control

### Verify No Caching
```powershell
# Make same request twice
$response1 = Invoke-WebRequest http://localhost:3000/api/contact -Method GET
$response2 = Invoke-WebRequest http://localhost:3000/api/contact -Method GET

# Check headers
$response1.Headers['Cache-Control']
# Should be: "no-store, no-cache, must-revalidate"
```

### Browser Test
1. Submit form
2. Open Network tab
3. Right-click request → "Replay XHR"
4. Should make fresh request (not from cache)

---

## 7️⃣ Integration Test - Full Flow

### Complete Contact Form Test
```javascript
// Run in browser console on contact page

async function testContactForm() {
  console.log('Starting integration test...');
  
  // Fill form
  document.querySelector('input[name="name"]').value = 'Test User';
  document.querySelector('input[name="email"]').value = 'test@example.com';
  document.querySelector('textarea[name="message"]').value = 'This is a test message with enough characters to pass validation.';
  
  // Make sure honeypot is empty
  const honeypot = document.querySelector('input[name="honeypot"]');
  if (honeypot.value) {
    console.error('❌ Honeypot not empty!');
    return;
  }
  
  // Submit
  const submitBtn = document.querySelector('button[type="submit"]');
  submitBtn.click();
  
  // Wait and check
  setTimeout(() => {
    console.log('Check console for:');
    console.log('1. ✅ reCAPTCHA token generated');
    console.log('2. ✅ reCAPTCHA verified by backend');
    console.log('3. ✅ Email sent successfully');
  }, 3000);
}

testContactForm();
```

**Expected Console Output:**
```
✅ reCAPTCHA token generated: 03AGdBq...
✅ reCAPTCHA verified by backend | Score: 0.9
📧 Sending email via server API...
✅ Email sent successfully via server!
```

---

## 8️⃣ Performance Test

### Check Middleware Performance
```powershell
# Measure response time
Measure-Command { 
    Invoke-WebRequest http://localhost:3000/api/contact -Method GET 
}

# Should be < 100ms for rate limit check
```

---

## 9️⃣ Vercel Production Test

After deploying to Vercel:

### Test Production Rate Limiting
```powershell
# Replace with your Vercel URL
$url = "https://your-app.vercel.app/api/contact"

for ($i=1; $i -le 6; $i++) { 
    Write-Host "Production Test $i"
    Invoke-WebRequest $url -Method GET
}
```

### Check Vercel Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click "Functions" or "Logs"
4. Filter by "Warning" to see abuse attempts
5. Look for 🚨 SECURITY ALERT logs

---

## 🔟 Automated Test Script

Save as `test-security.ps1`:

```powershell
# Security Feature Test Script
Write-Host "🔒 Starting Security Tests..." -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"
$passed = 0
$failed = 0

# Test 1: Rate Limiting
Write-Host "`n1️⃣ Testing Rate Limiting..." -ForegroundColor Yellow
try {
    for ($i=1; $i -le 11; $i++) { 
        $response = Invoke-WebRequest "$baseUrl/api/contact" -Method GET -ErrorAction SilentlyContinue
        if ($i -eq 11 -and $response.StatusCode -eq 429) {
            Write-Host "   ✅ Rate limiting works!" -ForegroundColor Green
            $passed++
        }
    }
} catch {
    Write-Host "   ❌ Rate limiting test failed" -ForegroundColor Red
    $failed++
}

# Test 2: Cache Control Headers
Write-Host "`n2️⃣ Testing Cache Control..." -ForegroundColor Yellow
$response = Invoke-WebRequest "$baseUrl/api/contact" -Method GET
if ($response.Headers['Cache-Control'] -like "*no-store*") {
    Write-Host "   ✅ Cache control headers present!" -ForegroundColor Green
    $passed++
} else {
    Write-Host "   ❌ Cache control headers missing" -ForegroundColor Red
    $failed++
}

# Test 3: Security Headers
Write-Host "`n3️⃣ Testing Security Headers..." -ForegroundColor Yellow
$headers = $response.Headers
$securityHeaders = @(
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection'
)

$headersPassed = $true
foreach ($header in $securityHeaders) {
    if ($response.Headers[$header]) {
        Write-Host "   ✅ $header present" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $header missing" -ForegroundColor Red
        $headersPassed = $false
    }
}

if ($headersPassed) { $passed++ } else { $failed++ }

# Summary
Write-Host "`n📊 Test Summary:" -ForegroundColor Cyan
Write-Host "   Passed: $passed" -ForegroundColor Green
Write-Host "   Failed: $failed" -ForegroundColor Red

if ($failed -eq 0) {
    Write-Host "`n✅ All security tests passed!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Some tests failed. Check configuration." -ForegroundColor Yellow
}
```

Run with:
```powershell
.\test-security.ps1
```

---

## 📝 Checklist

Before marking security as "ready for production":

- [ ] All rate limiting tests pass
- [ ] reCAPTCHA validation working
- [ ] Honeypot catches bots
- [ ] Security headers present
- [ ] Abuse logging working
- [ ] Cache control on all API routes
- [ ] ALLOWED_HOSTNAMES updated with production domain
- [ ] Environment variables set in Vercel
- [ ] Production test successful
- [ ] Logs visible in Vercel dashboard

---

## 🆘 Troubleshooting

### Tests Not Working?

**Rate limiting not triggering:**
- Check if using same IP
- Clear in-memory storage (restart dev server)
- Increase request count

**reCAPTCHA always passes:**
- Check if using test keys
- Verify MINIMUM_SCORE setting
- Check action validation

**Honeypot not catching bots:**
- Verify field is hidden properly
- Check validation logic
- Test with actual value in field

**Headers missing:**
- Clear browser cache
- Check middleware.ts is running
- Verify matcher config

---

## 📚 Next Steps

After all tests pass:
1. Deploy to Vercel staging
2. Test on staging URL
3. Monitor logs for 24 hours
4. Adjust thresholds if needed
5. Deploy to production
6. Set up monitoring alerts

---

**Happy Testing! 🚀**
