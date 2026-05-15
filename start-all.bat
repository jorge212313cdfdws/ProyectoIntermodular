@echo off
echo Arrancando Backend y Frontend...
npx concurrently --names "BACKEND,FRONTEND" --prefix-colors "blue,green" "cd backend && mvn spring-boot:run" "cd frontend && npm run dev -- --open"
pause
