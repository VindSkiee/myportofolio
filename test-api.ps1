# Test API Endpoint
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    recaptchaToken = "test-token-12345"
    action = "submit"
} | ConvertTo-Json

Write-Host "`n🧪 Testing POST /api/verify-recaptcha..." -ForegroundColor Cyan
Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $body -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/verify-recaptcha" -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "`n✅ Response received:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "`n❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "Details:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message -ForegroundColor Gray
    }
}
