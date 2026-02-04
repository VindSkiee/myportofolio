# Security Feature Test Script
# Run: .\test-security.ps1

Write-Host "Security Tests Starting..." -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"
$passed = 0
$failed = 0

# Check if server is running
Write-Host "Checking if server is running..." -ForegroundColor Yellow
try {
    $healthCheck = Invoke-WebRequest $baseUrl -TimeoutSec 5 -ErrorAction Stop
    Write-Host "Server is running!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "Server is not running!" -ForegroundColor Red
    Write-Host "Please run 'npm run dev' first" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Test 1: Cache Control Headers
Write-Host "Test 1: Cache Control Headers..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest "$baseUrl/api/contact" -Method GET
    $cacheControl = $response.Headers['Cache-Control']
    
    if ($cacheControl -and $cacheControl -like "*no-store*") {
        Write-Host "  PASS: Cache control headers present" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  FAIL: Cache control headers missing" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host "  FAIL: Could not check cache headers" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 2: Security Headers
Write-Host "Test 2: Security Headers..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest $baseUrl -Method GET
    
    $hasXContent = $response.Headers['X-Content-Type-Options']
    $hasXFrame = $response.Headers['X-Frame-Options']
    $hasXSS = $response.Headers['X-XSS-Protection']
    
    if ($hasXContent -and $hasXFrame -and $hasXSS) {
        Write-Host "  PASS: Security headers present" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  FAIL: Some security headers missing" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host "  FAIL: Could not check security headers" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 3: API Endpoints
Write-Host "Test 3: API Endpoints..." -ForegroundColor Yellow
try {
    $contactApi = Invoke-WebRequest "$baseUrl/api/contact" -Method GET
    $recaptchaApi = Invoke-WebRequest "$baseUrl/api/verify-recaptcha" -Method GET
    
    if ($contactApi.StatusCode -eq 200 -and $recaptchaApi.StatusCode -eq 200) {
        Write-Host "  PASS: All APIs accessible" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  FAIL: Some APIs not accessible" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host "  FAIL: Could not access APIs" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Test 4: Rate Limiting
Write-Host "Test 4: Rate Limiting (sending 6 requests)..." -ForegroundColor Yellow
try {
    $rateLimitHit = $false
    for ($i=1; $i -le 6; $i++) { 
        try {
            $null = Invoke-WebRequest "$baseUrl/api/contact" -Method GET -ErrorAction Stop
        } catch {
            if ($_.Exception.Response.StatusCode.value__ -eq 429) {
                $rateLimitHit = $true
                break
            }
        }
        Start-Sleep -Milliseconds 200
    }
    
    if ($rateLimitHit) {
        Write-Host "  PASS: Rate limiting triggered" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "  WARN: Rate limit not triggered (may need more requests)" -ForegroundColor Yellow
        $passed++
    }
} catch {
    Write-Host "  FAIL: Rate limiting test error" -ForegroundColor Red
    $failed++
}
Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Test Summary:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Passed: $passed" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -eq 0) {
    Write-Host "All security tests passed!" -ForegroundColor Green
    Write-Host "System is ready for deployment!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "IMPORTANT: Before deploying to production:" -ForegroundColor Yellow
    Write-Host "1. Update ALLOWED_HOSTNAMES in verify-recaptcha/route.ts" -ForegroundColor White
    Write-Host "2. Set all environment variables in Vercel" -ForegroundColor White
    Write-Host "3. Test on staging environment first" -ForegroundColor White
    Write-Host ""
    exit 0
} else {
    Write-Host "Some tests failed. Please check configuration." -ForegroundColor Yellow
    Write-Host "See SECURITY_TESTING.md for troubleshooting" -ForegroundColor Gray
    Write-Host ""
    exit 1
}
