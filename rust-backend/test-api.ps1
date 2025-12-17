# Test script for Nextn Rust Backend API

Write-Host "🚀 Testing Nextn Rust Backend API" -ForegroundColor Green
Write-Host ""

# Test health endpoint
Write-Host "1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8081/health" -Method GET
    Write-Host "✅ Health check successful!" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Cyan
    Write-Host "   Service: $($health.service)" -ForegroundColor Cyan
    Write-Host "   Version: $($health.version)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test signup endpoint
Write-Host "2. Testing user signup..." -ForegroundColor Yellow
try {
    $signupData = @{
        email = "test@example.com"
        password = "password123"
        name = "Test User"
    } | ConvertTo-Json

    $signupResponse = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/signup" -Method POST -ContentType "application/json" -Body $signupData
    Write-Host "✅ Signup successful!" -ForegroundColor Green
    Write-Host "   User ID: $($signupResponse.user.id)" -ForegroundColor Cyan
    Write-Host "   Email: $($signupResponse.user.email)" -ForegroundColor Cyan
    Write-Host "   Name: $($signupResponse.user.name)" -ForegroundColor Cyan
    Write-Host "   Token: $($signupResponse.token)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Signup failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test signin endpoint
Write-Host "3. Testing user signin..." -ForegroundColor Yellow
try {
    $signinData = @{
        email = "test@example.com"
        password = "password123"
    } | ConvertTo-Json

    $signinResponse = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/signin" -Method POST -ContentType "application/json" -Body $signinData
    Write-Host "✅ Signin successful!" -ForegroundColor Green
    Write-Host "   User ID: $($signinResponse.user.id)" -ForegroundColor Cyan
    Write-Host "   Email: $($signinResponse.user.email)" -ForegroundColor Cyan
    Write-Host "   Name: $($signinResponse.user.name)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Signin failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test events endpoint
Write-Host "4. Testing events list..." -ForegroundColor Yellow
try {
    $events = Invoke-RestMethod -Uri "http://localhost:8081/api/events" -Method GET
    Write-Host "✅ Events retrieved successfully!" -ForegroundColor Green
    Write-Host "   Found $($events.Count) events:" -ForegroundColor Cyan
    
    foreach ($event in $events) {
        Write-Host "   - $($event.name) (Price: ₹$($event.price))" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Events retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 API testing complete!" -ForegroundColor Green
Write-Host ""
Write-Host "The Rust backend is running on: http://localhost:8081" -ForegroundColor Cyan
Write-Host ""
Write-Host "Available endpoints:" -ForegroundColor Yellow
Write-Host "  GET  /health                 - Health check" -ForegroundColor White
Write-Host "  POST /api/auth/signup        - User registration" -ForegroundColor White
Write-Host "  POST /api/auth/signin        - User login" -ForegroundColor White
Write-Host "  GET  /api/events             - List events" -ForegroundColor White