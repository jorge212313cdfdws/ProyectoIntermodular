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

**IMPORTANTE**: El proyecto se sube completo (raíz) a GitHub. Los servicios detectan automáticamente qué carpeta usar.

### Deploy Frontend en Vercel

1. **Subir TODO el proyecto a GitHub** (no solo frontend)
2. **Ir a Vercel** → New Project → Import Git Repository
3. **Configurar:**
   - **Root Directory**: `frontend` ⚠️ (Vercel trabajará solo con esta carpeta)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Variable de entorno:**
   ```
   VITE_API_URL=https://tu-backend.railway.app
   ```
5. Deploy!

### Deploy Backend + Base de Datos en Railway

1. **Subir TODO el proyecto a GitHub** (ya está)
2. **Ir a Railway.app** → New Project
3. **Provisionar PostgreSQL**:
   - Add Service → Database → PostgreSQL
   - Railway crea automáticamente: `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

4. **Deploy Backend**:
   - Add Service → GitHub Repo → Tu repositorio
   - **Root Directory**: `backend` ⚠️ (Railway trabajará solo con esta carpeta)
   - Railway detecta automáticamente Java/Maven

5. **Variables de entorno en Railway**:
   ```bash
   # Las de base de datos YA están creadas automáticamente
   
   # Agregar estas:
   JWT_SECRET=clave_super_segura_cambiar_por_algo_aleatorio_256_bits
   SPRING_SQL_INIT_MODE=always
   CORS_ALLOWED_ORIGINS=http://localhost:3000,https://TU_URL_VERCEL.vercel.app
   ```

6. **Copiar URL del backend**: `https://tu-backend.up.railway.app`

7. **Actualizar Vercel**:
   - Settings → Environment Variables
   - `VITE_API_URL` = `https://tu-backend.up.railway.app`

### ¿Por qué funciona así?

```
GitHub Repository (ProyectoIntermodular/)
├── backend/          ← Railway apunta aquí (Root Directory: backend)
├── frontend/         ← Vercel apunta aquí (Root Directory: frontend)
├── create_db.sql
└── README.md

Vercel solo ve:    frontend/*
Railway solo ve:   backend/*
GitHub tiene:      TODO el proyecto
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
# 1. Preparar repositorio
git add .
git commit -m "Proyecto listo para deployment"
git push origin Jorge

# 2. Railway (Backend + BD)
□ Ir a railway.app
□ New Project → PostgreSQL
□ Add Service → GitHub Repo (TODO el repo)
□ Root Directory: backend
□ Configurar variables:
  - JWT_SECRET
  - SPRING_SQL_INIT_MODE=always
  - CORS_ALLOWED_ORIGINS=http://localhost:3000,https://TU_URL.vercel.app
□ Copiar URL: https://xxxxx.up.railway.app

# 3. Vercel (Frontend)
□ Ir a vercel.com
□ New Project → Import de GitHub (TODO el repo)
□ Root Directory: frontend
□ Framework: Vite
□ Variable: VITE_API_URL=https://xxxxx.up.railway.app
□ Deploy

# 4. Actualizar CORS
□ En Railway, actualizar CORS_ALLOWED_ORIGINS con URL de Vercel
□ Push a GitHub para redeploy automático

# 5. Probar
□ Abrir https://tu-proyecto.vercel.app
□ Login con: admin@taller.com / admin123
□ ✅ ¡Funciona!
```

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

Jorge - ProyectoIntermodular