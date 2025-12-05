@echo off
:: ---------------------------------------
:: Arranque simultáneo Backend (Spring Boot) y Frontend (Vite)
:: ---------------------------------------

:: Configura colores opcionales para diferenciar las consolas
color 0A

:: Lanza Backend en una nueva ventana
start "Backend - Spring Boot" cmd /k "cd backend && mvnw.cmd spring-boot:run"

:: Lanza Frontend en otra ventana
start "Frontend - Vite" cmd /k "cd frontend && npm run dev -- --open"

:: Mensaje opcional
echo Backend y Frontend arrancados. Presiona cualquier tecla para cerrar este script.
pause
