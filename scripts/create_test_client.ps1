$payload = @{
  nombreCompleto = 'Test Usuario'
  email = 'testuser@example.com'
  direccion = 'Calle Test 123'
  vehiculos = @(@{ marca='Ford'; modelo='Fiesta'; placa='TEST-01'; 'año' = 2015 })
}
$json = $payload | ConvertTo-Json -Depth 5
try {
  $r = Invoke-RestMethod -Uri 'http://localhost:8080/api/clientes' -Method Post -ContentType 'application/json' -Body $json -TimeoutSec 10
  Write-Output 'CREATED:'
  $r | ConvertTo-Json -Depth 5
} catch {
  Write-Output 'ERROR:'
  Write-Output $_.Exception.Message
  if ($_.Exception.Response) {
    try { $body = Get-Content -Raw -Path $_.Exception.Response.ResponseStream; Write-Output $body } catch {}
  }
}
