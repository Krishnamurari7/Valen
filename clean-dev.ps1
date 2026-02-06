# Clean Next.js dev server lock files and processes
Write-Host "Cleaning Next.js dev environment..." -ForegroundColor Yellow

# Kill all Node.js processes
Write-Host "Stopping Node.js processes..." -ForegroundColor Cyan
taskkill /F /IM node.exe /T 2>$null
Start-Sleep -Seconds 1

# Remove .next directory
Write-Host "Removing .next directory..." -ForegroundColor Cyan
if (Test-Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Removed .next directory" -ForegroundColor Green
} else {
    Write-Host "✓ .next directory doesn't exist" -ForegroundColor Green
}

# Check for processes on ports 3000-3003
Write-Host "Checking ports 3000-3003..." -ForegroundColor Cyan
$ports = @(3000, 3001, 3002, 3003)
foreach ($port in $ports) {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($process) {
        $pid = $process.OwningProcess
        Write-Host "Found process $pid on port $port, killing..." -ForegroundColor Yellow
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}

Write-Host "`n✓ Cleanup complete! You can now run 'npm run dev'" -ForegroundColor Green
