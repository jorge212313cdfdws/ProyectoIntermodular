# Taller Mecánico - Sistema de Gestión

## 📋 ¿Qué es este proyecto?

Sistema web completo para gestionar un taller mecánico que permite:
- **Administradores**: Gestionar clientes, vehículos y órdenes de trabajo
- **Mecánicos**: Ver y actualizar el estado de reparaciones
- **Clientes**: Consultar sus vehículos y el historial de servicios

## 🎯 ¿Para qué sirve?

Este proyecto resuelve la gestión operativa de un taller mecánico mediante:
1. **Control de clientes** - Registro y seguimiento de información de contacto
2. **Inventario de vehículos** - Historial completo de cada coche
3. **Órdenes de trabajo** - Desde la recepción hasta la entrega
4. **Asignación de mecánicos** - Distribución de carga de trabajo
5. **Tracking de servicios** - Qué se hizo, cuándo y a qué costo

Ideal para talleres pequeños y medianos que buscan digitalizar sus operaciones.

---

## 🚀 Características Técnicas

- ✅ **Autenticación JWT** - Login/Register con tokens seguros
- ✅ **CRUD Completo** - Gestión de clientes, vehículos y órdenes de trabajo
- ✅ **Roles de Usuario** - Admin, Mecánico, Cliente
- ✅ **Dashboard Interactivo** - Diferentes vistas según el rol
- ✅ **Notificaciones Toast** - Sistema de notificaciones personalizado
- ✅ **Responsive Design** - Funciona en móviles y tablets
- ✅ **Confirmaciones** - Diálogos de confirmación antes de eliminar

## 📦 Tecnologías

### Backend
- Java 17
- Spring Boot 3.5.7
- PostgreSQL 18.1
- JWT (jjwt 0.12.3)
- Maven

### Frontend
- React 19.2.0
- Vite 7.2.4
- React Router Dom 6.x
- CSS3 (sin frameworks externos)

## 🛠️ Instalación Local

### Prerequisitos
- Java 17+
- PostgreSQL 18+
- Node.js 18+
- npm 9+

### 1. Configurar Base de Datos

```bash
# Crear la base de datos
psql -U postgres
CREATE DATABASE taller_mecanico;
\q

# Ejecutar scripts de inicialización
cd ProyectoIntermodular
psql -U postgres -d taller_mecanico -f create_db.sql
psql -U postgres -d taller_mecanico -f reset_db.sql
```

### 2. Backend

```bash
cd backend

# Configurar application.properties
# Editar src/main/resources/application.properties con tus credenciales de PostgreSQL

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8080`

### 3. Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y configurar VITE_API_URL=http://localhost:8080

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## 🌐 Deployment

### Estrategia de Deployment

**GitHub**: Sube TODO el proyecto completo (raíz)  
**Railway**: Backend + PostgreSQL (usa carpeta `backend/`)  
**Vercel**: Solo Frontend (usa carpeta `frontend/`)

---

### PASO 1: Subir a GitHub

```bash
# Estando en la raíz del proyecto
git push origin Jorge
```

---

### PASO 2: Deploy Backend + Base de Datos (Railway)

#### 2.1. Crear base de datos PostgreSQL

1. Ir a [railway.app](https://railway.app) → **New Project**
2. **Provision PostgreSQL**
   - Railway genera automáticamente:
     - `DATABASE_URL`
     - `POSTGRES_USER`
     - `POSTGRES_PASSWORD`
   - ✅ No necesitas configurar nada más

#### 2.2. Deploy del Backend

1. En el mismo proyecto de Railway → **New Service**
2. **GitHub Repo** → Selecciona `ProyectoIntermodular`
3. **Configuración importante:**
   ```
   Root Directory: backend
   ```
   ⚠️ Railway DEBE apuntar solo a la carpeta backend
4. Railway detecta automáticamente que es Java/Maven

#### 2.3. Variables de entorno en Railway

En el servicio del backend, agrega:

```bash
JWT_SECRET=clave_muy_segura_cambiar_por_256_bits_aleatorios
SPRING_SQL_INIT_MODE=always
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

⚠️ **Nota**: Actualizaremos `CORS_ALLOWED_ORIGINS` después de deployar en Vercel

#### 2.4. Obtener URL del backend

- Railway asigna una URL tipo: `https://proyectointermodular-production-xxxx.up.railway.app`
- **Cópiala**, la necesitarás para Vercel

---

### PASO 3: Deploy Frontend (Vercel)

#### 3.1. Crear proyecto en Vercel

1. Ir a [vercel.com](https://vercel.com) → **New Project**
2. **Import Git Repository** → Selecciona tu repo de GitHub
3. **Configuración CRÍTICA:**
   ```
   Framework Preset:  Vite
   Root Directory:    frontend    ← ⚠️ MUY IMPORTANTE
   Build Command:     npm run build
   Output Directory:  dist
   ```

#### 3.2. Variables de entorno en Vercel

Agrega esta variable:

```
Name:  VITE_API_URL
Value: https://proyectointermodular-production-xxxx.up.railway.app
```

(Usa la URL que copiaste de Railway)

#### 3.3. Deploy

Click en **Deploy** y espera ~2 minutos

---

### PASO 4: Actualizar CORS

#### 4.1. Obtener URL de Vercel

Después del deploy, Vercel te da una URL tipo:
```
https://proyecto-intermodular-xxxx.vercel.app
```

#### 4.2. Actualizar Railway

1. Ve a Railway → Tu servicio backend → **Variables**
2. Actualiza `CORS_ALLOWED_ORIGINS`:
   ```
   http://localhost:3000,https://proyecto-intermodular-xxxx.vercel.app
   ```
3. Railway hace redeploy automáticamente

---

### PASO 5: ¡Probar!

1. Abre tu URL de Vercel
2. Login con: `admin@taller.com` / `admin123`
3. ✅ ¡Funciona!

---

### 📊 Arquitectura Final

```
┌─────────────────────────────────────┐
│  Usuario                             │
│    │                                 │
│    ├─► Vercel (Frontend)             │
│    │   https://tu-proyecto.vercel.app│
│    │   └─ React + Vite               │
│    │                                 │
│    └─► Railway (Backend)             │
│        https://xxxxx.railway.app     │
│        ├─ Spring Boot               │
│        └─► PostgreSQL (Railway)      │
│            └─ Datos de data.sql      │
└─────────────────────────────────────┘
```

### Alternativa: Todo en Railway

También puedes deployar el frontend en Railway:
- Add Service → GitHub Repo
- Root Directory: `frontend`
- Build Command: `npm run build`
- Start Command: `npx serve -s dist -l $PORT`

### Resumen de URLs finales:
```
┌─────────────────────────────────────────────────────┐
│  ARQUITECTURA DE DEPLOYMENT                         │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Usuario                                             │
│    │                                                 │
│    ├─► Frontend (Vercel)                            │
│    │   https://tu-proyecto.vercel.app               │
│    │   ├─ React + Vite                              │
│    │   └─ Variable: VITE_API_URL                    │
│    │                                                 │
│    └─► Backend (Railway)                            │
│        https://tu-proyecto.up.railway.app           │
│        ├─ Spring Boot + Java 17                     │
│        ├─ Variables:                                │
│        │  - DATABASE_URL (auto)                     │
│        │  - JWT_SECRET                              │
│        │  - CORS_ALLOWED_ORIGINS                    │
│        │                                             │
│        └─► PostgreSQL (Railway)                     │
│            └─ Base de datos gestionada              │
│               - Backups automáticos                 │
│               - Datos de data.sql                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Checklist de Deployment:

```bash
# ☑️ PASO 1: GitHub
git push origin Jorge

# ☑️ PASO 2: Railway (Backend + BD)
□ railway.app → New Project
□ Provision PostgreSQL
□ New Service → GitHub Repo
□ Root Directory: backend
□ Variables:
  JWT_SECRET=clave_segura_256_bits
  SPRING_SQL_INIT_MODE=always
  CORS_ALLOWED_ORIGINS=http://localhost:3000
□ Copiar URL: https://xxxxx.up.railway.app

# ☑️ PASO 3: Vercel (Frontend)
□ vercel.com → New Project
□ Import Git Repository
□ Root Directory: frontend
□ Framework: Vite
□ Variable: VITE_API_URL=https://xxxxx.up.railway.app
□ Deploy
□ Copiar URL: https://xxxxx.vercel.app

# ☑️ PASO 4: Actualizar CORS
□ Railway → Variables
□ CORS_ALLOWED_ORIGINS=http://localhost:3000,https://xxxxx.vercel.app
□ Esperar redeploy automático

# ☑️ PASO 5: Probar
□ Abrir https://xxxxx.vercel.app
□ Login: admin@taller.com / admin123
□ ✅ ¡Listo!
```

---

### 🔧 Troubleshooting

**Error: "CORS policy blocked"**
- Verifica que `CORS_ALLOWED_ORIGINS` en Railway tenga tu URL de Vercel
- Espera 1-2 minutos para que Railway redeploy

**Error: "Cannot connect to database"**
- Railway genera automáticamente las variables de BD
- No necesitas configurar `DATABASE_URL` manualmente

**Error: "Login failed"**
- Verifica que `VITE_API_URL` en Vercel apunte a Railway
- Comprueba que `SPRING_SQL_INIT_MODE=always` esté en Railway

**Frontend deploy exitoso pero pantalla blanca**
- Verifica que Root Directory sea `frontend`
- Comprueba que Build Command sea `npm run build`
- Output Directory debe ser `dist`

## 📁 Estructura del Proyecto

```
ProyectoIntermodular/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/taller/
│   │   ├── config/            # Configuración (CORS, JWT, etc)
│   │   ├── controller/        # REST Controllers
│   │   ├── model/             # Entidades JPA
│   │   ├── repository/        # Repositorios JPA
│   │   ├── service/           # Lógica de negocio
│   │   └── util/              # Utilidades (JWT)
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql           # Datos iniciales
├── frontend/                   # React App
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── ClienteList/
│   │   │   ├── VehiculoList/
│   │   │   ├── OrdenList/
│   │   │   ├── Toast/         # Sistema de notificaciones
│   │   │   ├── Modal/
│   │   │   └── Forms/
│   │   ├── hooks/             # Custom hooks
│   │   │   └── useAdminData.js
│   │   ├── pages/             # Páginas principales
│   │   │   ├── auth/          # Login/Register
│   │   │   ├── admin/         # Dashboard admin
│   │   │   ├── mecanico/      # Dashboard mecánico
│   │   │   └── cliente/       # Dashboard cliente
│   │   └── styles/            # Estilos globales
│   ├── .env                   # Variables de entorno (no subir)
│   └── .env.example           # Template de variables
└── README.md
```

## 🔧 Variables de Entorno

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8080  # Desarrollo
# VITE_API_URL=https://tu-backend.com  # Producción
```

### Backend (application.properties)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/taller_mecanico
spring.datasource.username=postgres
spring.datasource.password=tu_password
jwt.secret=tu_secret_key_muy_seguro_minimo_256_bits
```

## 👥 Usuarios de Prueba

Después de ejecutar `data.sql`:

### Admin
- Email: `admin@taller.com`
- Password: `admin123`

### Mecánico
- Email: `mecanico1@taller.com`
- Password: `mec123`

### Cliente
- Email: `cliente1@taller.com`
- Password: `cliente123`

## 📝 Scripts Útiles

### Backend
```bash
mvn clean install          # Compilar
mvn spring-boot:run        # Ejecutar
mvn test                   # Tests
```

### Frontend
```bash
npm install                # Instalar dependencias
npm run dev                # Desarrollo
npm run build              # Build producción
npm run preview            # Preview build local
```

## 🐛 Troubleshooting

### Error de CORS
Asegúrate de que el backend tenga configurado el origen correcto en `WebConfig.java`:
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000", "https://tu-vercel-url.vercel.app")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
}
```

### Error de conexión a base de datos
1. Verifica que PostgreSQL esté corriendo
2. Confirma credenciales en `application.properties`
3. Verifica que la base de datos `taller_mecanico` exista

### Build falla en Vercel
1. Asegúrate de que `VITE_API_URL` esté configurado
2. Verifica que el directorio root sea `frontend`
3. Confirma que el output directory sea `dist`

## 📄 Licencia

Este proyecto es parte de un trabajo académico para DAD (Desarrollo de Aplicaciones Distribuidas).

## 👨‍💻 Autor

Jorge y Brian - ProyectoIntermodular
