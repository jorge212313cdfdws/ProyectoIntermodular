@echo off
echo ============================================
echo   Iniciando Proyecto Taller Mecanico
echo ============================================
echo.

REM Verificar si existe node_modules en frontend
if not exist "frontend\node_modules" (
    echo [1/4] Instalando dependencias del frontend...
    cd frontend
    call npm install
    cd ..
    echo.
) else (
    echo [1/4] Dependencias del frontend ya instaladas
    echo.
)

REM Verificar y copiar .env en frontend
if not exist "frontend\.env" (
    echo [2/4] Creando archivo .env desde .env.example...
    copy frontend\.env.example frontend\.env
    echo.
) else (
    echo [2/4] Archivo .env ya existe
    echo.
)

REM Verificar Maven Wrapper en backend
if not exist "backend\mvnw.cmd" (
    echo [3/4] Generando Maven Wrapper...
    cd backend
    call mvn wrapper:wrapper
    cd ..
    echo.
) else (
    echo [3/4] Maven Wrapper ya existe
    echo.
)

echo [4/4] Iniciando servidores...
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.

concurrently "cd backend && mvn spring-boot:run" "cd frontend && npm run dev -- --open"

pause