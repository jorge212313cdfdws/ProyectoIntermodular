# Especificación de Requisitos del Software (ERS)

**Proyecto:** Sistema de Gestión de Taller Mecánico  
**Versión:** 1.0  
**Fecha:** Mayo 2026  

---

## Índice

1. [Introducción](#1-introducción)
2. [Descripción general del sistema](#2-descripción-general-del-sistema)
3. [Requisitos funcionales](#3-requisitos-funcionales)
4. [Requisitos no funcionales](#4-requisitos-no-funcionales)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Reglas de especificación](#6-reglas-de-especificación)

---

## 1. Introducción

### 1.1 Propósito
Este documento especifica los requisitos funcionales y no funcionales del Sistema de Gestión de Taller Mecánico. Está dirigido al equipo de desarrollo y sirve como referencia oficial para el diseño, implementación y validación del sistema.

### 1.2 Alcance
El sistema cubre la gestión operativa completa de un taller mecánico:
- Autenticación y control de acceso por roles (Admin, Mecánico, Cliente)
- CRUD de clientes, vehículos, órdenes de trabajo y mecánicos
- Aplicación web (React + Spring Boot) y aplicación Android nativa

### 1.3 Definiciones y acrónimos
| Término | Definición |
|---------|-----------|
| ERS | Especificación de Requisitos del Software |
| JWT | JSON Web Token — mecanismo de autenticación sin estado |
| CRUD | Create, Read, Update, Delete |
| OT | Orden de Trabajo |
| SPA | Single Page Application |
| RF | Requisito Funcional |
| RNF | Requisito No Funcional |

---

## 2. Descripción general del sistema

### 2.1 Perspectiva del producto
El sistema es una aplicación web multicapa con arquitectura cliente-servidor:
- **Frontend:** SPA en React 19 + Vite, consumida desde el navegador
- **Backend:** API REST en Spring Boot 3.5 con autenticación JWT
- **Base de datos:** PostgreSQL 14+
- **Mobile:** App Android nativa (Java) que consume la misma API REST

### 2.2 Roles de usuario
| Rol | Descripción |
|-----|-------------|
| **Admin** | Gestiona todas las entidades del sistema: clientes, vehículos, órdenes, mecánicos |
| **Mecánico** | Consulta los clientes, vehículos y órdenes asignadas. Actualiza el estado de las reparaciones |
| **Cliente** | Accede solo a su propio perfil, sus vehículos y su historial de servicios |

### 2.3 Restricciones generales
- Todas las rutas protegidas requieren JWT válido en la cabecera `Authorization: Bearer <token>`
- Las contraseñas se almacenan tal como las introduce el usuario (sin hash en la versión actual)
- El sistema está diseñado para un único taller (no multi-tenant)

---

## 3. Requisitos funcionales

### 3.1 Autenticación (AUTH)

| ID | Requisito |
|----|-----------|
| RF-AUTH-01 | El sistema permitirá al usuario iniciar sesión con email y contraseña |
| RF-AUTH-02 | El sistema devolverá un JWT con el rol del usuario tras un login exitoso |
| RF-AUTH-03 | El sistema permitirá el registro de nuevos usuarios con nombre, email, contraseña y dirección |
| RF-AUTH-04 | El sistema rechazará el acceso con credenciales incorrectas con mensaje de error diferenciado |
| RF-AUTH-05 | El sistema redirigirá al dashboard correspondiente según el rol del usuario autenticado |
| RF-AUTH-06 | El sistema permitirá cerrar sesión eliminando el token del almacenamiento local |

### 3.2 Gestión de clientes (CLI)

| ID | Requisito |
|----|-----------|
| RF-CLI-01 | El administrador podrá listar todos los clientes registrados |
| RF-CLI-02 | El administrador podrá crear un nuevo cliente con nombre, email y dirección |
| RF-CLI-03 | El administrador podrá editar los datos de un cliente existente |
| RF-CLI-04 | El administrador podrá eliminar un cliente tras confirmación explícita |
| RF-CLI-05 | El cliente podrá ver únicamente su propio perfil |

### 3.3 Gestión de vehículos (VEH)

| ID | Requisito |
|----|-----------|
| RF-VEH-01 | El administrador podrá listar todos los vehículos del sistema |
| RF-VEH-02 | El administrador podrá crear un vehículo (marca, modelo, placa, año) asociado a un cliente |
| RF-VEH-03 | El administrador podrá editar los datos de un vehículo existente |
| RF-VEH-04 | El administrador podrá eliminar un vehículo tras confirmación |
| RF-VEH-05 | El cliente podrá ver los vehículos asociados a su cuenta |
| RF-VEH-06 | El mecánico podrá consultar los vehículos en el sistema |

### 3.4 Gestión de órdenes de trabajo (OT)

| ID | Requisito |
|----|-----------|
| RF-OT-01 | El administrador podrá listar todas las órdenes de trabajo |
| RF-OT-02 | El administrador podrá crear una orden con descripción, fecha, cliente, vehículo y mecánico asignado |
| RF-OT-03 | El administrador podrá editar una orden existente |
| RF-OT-04 | El administrador podrá eliminar una orden tras confirmación |
| RF-OT-05 | El administrador podrá asociar uno o varios servicios a una orden |
| RF-OT-06 | El mecánico podrá consultar las órdenes que tiene asignadas |
| RF-OT-07 | El cliente podrá consultar el historial de órdenes vinculadas a sus vehículos |

### 3.5 Gestión de mecánicos (MEC)

| ID | Requisito |
|----|-----------|
| RF-MEC-01 | El administrador podrá listar todos los mecánicos |
| RF-MEC-02 | El administrador podrá registrar un mecánico con nombre, especialidad y horas trabajadas |
| RF-MEC-03 | El administrador podrá editar los datos de un mecánico |
| RF-MEC-04 | El administrador podrá eliminar un mecánico |

### 3.6 Aplicación móvil (MOB)

| ID | Requisito |
|----|-----------|
| RF-MOB-01 | La app Android permitirá iniciar sesión con las mismas credenciales que la web |
| RF-MOB-02 | La app mantendrá la sesión activa mediante `SharedPreferences` |
| RF-MOB-03 | La app incluirá el JWT automáticamente en todas las peticiones autenticadas |
| RF-MOB-04 | La app permitirá al usuario ver, crear, editar y eliminar clientes |
| RF-MOB-05 | La app redirigirá al login si la sesión ha expirado |

---

## 4. Requisitos no funcionales

### 4.1 Seguridad

| ID | Requisito |
|----|-----------|
| RNF-SEG-01 | Todos los endpoints de la API excepto `/api/auth/**` requieren JWT válido |
| RNF-SEG-02 | El JWT debe incluir el rol del usuario para control de acceso |
| RNF-SEG-03 | La configuración CORS solo permite orígenes autorizados |
| RNF-SEG-04 | Las rutas del frontend están protegidas por rol; un usuario no podrá acceder al dashboard de otro rol |

### 4.2 Rendimiento

| ID | Requisito |
|----|-----------|
| RNF-REN-01 | El backend responderá a peticiones CRUD en menos de 500 ms en condiciones normales |
| RNF-REN-02 | El frontend cargará en menos de 3 segundos en conexión estándar |

### 4.3 Usabilidad

| ID | Requisito |
|----|-----------|
| RNF-USA-01 | El sistema mostrará notificaciones Toast en todas las operaciones de éxito y error |
| RNF-USA-02 | Las eliminaciones requerirán confirmación explícita mediante diálogo |
| RNF-USA-03 | La interfaz será responsive y adaptada a diferentes tamaños de pantalla |

### 4.4 Mantenibilidad

| ID | Requisito |
|----|-----------|
| RNF-MAN-01 | El código frontend seguirá las reglas de ESLint definidas en `eslint.config.js` |
| RNF-MAN-02 | Los componentes React serán reutilizables y recibirán datos exclusivamente por props |
| RNF-MAN-03 | Los estilos globales se definirán mediante variables CSS en `variables.css` |

### 4.5 Portabilidad

| ID | Requisito |
|----|-----------|
| RNF-POR-01 | El backend es desplegable en Railway sin modificaciones de código |
| RNF-POR-02 | El frontend es desplegable en Vercel sin modificaciones de código |
| RNF-POR-03 | La app Android es compatible con Android 7.0 (API 24) o superior |

---

## 5. Historias de usuario

Las historias de usuario siguen el formato estándar:
> **Como** [rol], **quiero** [acción] **para** [beneficio].

También se especifican los **criterios de aceptación** que determinan cuándo la historia está completada.

---

### 5.1 Historias del Administrador

---

#### HU-ADMIN-01 — Gestión completa de clientes
**Como** administrador,  
**quiero** poder crear, editar y eliminar clientes  
**para** mantener actualizada la base de datos del taller.

**Criterios de aceptación:**
- [ ] Existe un formulario de creación con campos: nombre completo, email, dirección y contraseña
- [ ] El email debe ser único en el sistema; se muestra error si ya existe
- [ ] El administrador puede editar cualquier campo de un cliente
- [ ] Antes de eliminar, aparece un diálogo de confirmación
- [ ] Tras cada operación exitosa se muestra un Toast de confirmación

**RF relacionados:** RF-CLI-01, RF-CLI-02, RF-CLI-03, RF-CLI-04  
**Estado:** ✅ Implementada

---

#### HU-ADMIN-02 — Gestión completa de vehículos
**Como** administrador,  
**quiero** registrar vehículos y asignarlos a clientes  
**para** controlar qué vehículos pertenecen a cada cliente.

**Criterios de aceptación:**
- [ ] El formulario incluye: marca, modelo, placa, año y cliente asociado
- [ ] La placa debe ser única en el sistema
- [ ] Al crear un vehículo se selecciona el cliente de una lista desplegable
- [ ] El administrador puede editar y eliminar vehículos

**RF relacionados:** RF-VEH-01, RF-VEH-02, RF-VEH-03, RF-VEH-04  
**Estado:** ✅ Implementada

---

#### HU-ADMIN-03 — Gestión de órdenes de trabajo
**Como** administrador,  
**quiero** crear y asignar órdenes de trabajo a mecánicos  
**para** registrar las reparaciones del taller.

**Criterios de aceptación:**
- [ ] El formulario incluye: descripción, fecha, cliente, vehículo y mecánico
- [ ] Se puede asociar uno o varios servicios a cada orden
- [ ] El costo total se calcula en base a los servicios asociados
- [ ] El administrador puede editar o eliminar cualquier orden

**RF relacionados:** RF-OT-01, RF-OT-02, RF-OT-03, RF-OT-04, RF-OT-05  
**Estado:** ✅ Implementada

---

#### HU-ADMIN-04 — Gestión de mecánicos
**Como** administrador,  
**quiero** registrar y gestionar los mecánicos del taller  
**para** poder asignarlos a órdenes de trabajo.

**Criterios de aceptación:**
- [ ] El formulario incluye: nombre, especialidad, horas trabajadas
- [ ] Se puede editar y eliminar mecánicos
- [ ] Los mecánicos aparecen en el selector al crear una orden

**RF relacionados:** RF-MEC-01, RF-MEC-02, RF-MEC-03, RF-MEC-04  
**Estado:** ✅ Implementada

---

### 5.2 Historias del Mecánico

---

#### HU-MEC-01 — Consultar clientes y vehículos
**Como** mecánico,  
**quiero** poder ver el listado de clientes y sus vehículos  
**para** conocer la información del trabajo que debo realizar.

**Criterios de aceptación:**
- [ ] El mecánico puede ver la lista completa de clientes
- [ ] El mecánico puede ver la lista de vehículos
- [ ] El mecánico no puede crear, editar ni eliminar registros
- [ ] Intentar acceder al panel de admin redirige a la página principal

**RF relacionados:** RF-CLI-01, RF-VEH-06  
**Estado:** ✅ Implementada

---

#### HU-MEC-02 — Consultar órdenes asignadas
**Como** mecánico,  
**quiero** ver las órdenes de trabajo que me han sido asignadas  
**para** saber qué reparaciones tengo pendientes.

**Criterios de aceptación:**
- [ ] El mecánico puede ver el listado de órdenes con descripción, vehículo y cliente
- [ ] Se muestra la fecha de creación y el estado de cada orden

**RF relacionados:** RF-OT-06  
**Estado:** ✅ Implementada

---

### 5.3 Historias del Cliente

---

#### HU-CLI-01 — Ver mi perfil
**Como** cliente,  
**quiero** ver mis datos personales en el sistema  
**para** comprobar que la información registrada es correcta.

**Criterios de aceptación:**
- [ ] El cliente puede ver su nombre, email y dirección
- [ ] El cliente no puede ver datos de otros clientes
- [ ] Hay un botón de cierre de sesión en el dashboard

**RF relacionados:** RF-CLI-05  
**Estado:** ✅ Implementada

---

#### HU-CLI-02 — Ver mis vehículos
**Como** cliente,  
**quiero** ver los vehículos asociados a mi cuenta  
**para** controlar qué vehículos tengo registrados en el taller.

**Criterios de aceptación:**
- [ ] El cliente ve la lista de sus vehículos con marca, modelo, placa y año
- [ ] No aparecen vehículos de otros clientes

**RF relacionados:** RF-VEH-05  
**Estado:** ✅ Implementada

---

#### HU-CLI-03 — Ver historial de servicios
**Como** cliente,  
**quiero** consultar el historial de órdenes de trabajo de mis vehículos  
**para** saber qué reparaciones se han realizado y cuánto costaron.

**Criterios de aceptación:**
- [ ] El cliente puede ver las órdenes asociadas a sus vehículos
- [ ] Cada orden muestra descripción, fecha, mecánico asignado y costo total

**RF relacionados:** RF-OT-07  
**Estado:** ✅ Implementada

---

### 5.4 Historias de autenticación

---

#### HU-AUTH-01 — Inicio de sesión
**Como** usuario del sistema (admin, mecánico o cliente),  
**quiero** iniciar sesión con mi email y contraseña  
**para** acceder a las funciones correspondientes a mi rol.

**Criterios de aceptación:**
- [ ] El formulario tiene campos de email y contraseña (con toggle de visibilidad)
- [ ] Las credenciales incorrectas muestran mensaje de error específico
- [ ] El login exitoso redirige al dashboard del rol correspondiente
- [ ] El JWT se almacena en `localStorage` para peticiones posteriores
- [ ] El botón queda deshabilitado mientras la petición está en curso

**RF relacionados:** RF-AUTH-01, RF-AUTH-02, RF-AUTH-05  
**Estado:** ✅ Implementada

---

#### HU-AUTH-02 — Registro de nuevo usuario
**Como** persona que quiere ser cliente del taller,  
**quiero** poder crear una cuenta desde la web  
**para** acceder al sistema sin necesitar que el administrador me registre.

**Criterios de aceptación:**
- [ ] El formulario solicita: nombre completo, email, contraseña y dirección
- [ ] El email debe ser único; se muestra error si ya está en uso
- [ ] Tras el registro exitoso el usuario puede iniciar sesión

**RF relacionados:** RF-AUTH-03  
**Estado:** ✅ Implementada

---

### 5.5 Historias de la app móvil

---

#### HU-MOB-01 — Login en la app Android
**Como** usuario del sistema,  
**quiero** iniciar sesión desde la aplicación Android  
**para** acceder al sistema desde mi teléfono móvil.

**Criterios de aceptación:**
- [ ] La app muestra un formulario de login con email y contraseña
- [ ] Las credenciales se envían al mismo backend que la web
- [ ] La sesión se guarda en `SharedPreferences` y persiste entre aperturas
- [ ] Si la sesión caduca, la app redirige al login automáticamente

**RF relacionados:** RF-MOB-01, RF-MOB-02, RF-MOB-05  
**Estado:** ✅ Implementada

---

#### HU-MOB-02 — CRUD de clientes en Android
**Como** administrador,  
**quiero** gestionar clientes desde la app Android  
**para** poder operar el taller desde el móvil.

**Criterios de aceptación:**
- [ ] La app muestra el listado de clientes
- [ ] Se pueden crear, editar y eliminar clientes
- [ ] Todas las peticiones incluyen el JWT en la cabecera `Authorization`

**RF relacionados:** RF-MOB-03, RF-MOB-04  
**Estado:** ✅ Implementada

---

## 6. Reglas de especificación

Este apartado recoge las convenciones que se siguen en este documento y en el proceso de desarrollo para garantizar consistencia.

### 6.1 Formato de requisitos funcionales
- **ID único:** `RF-[MÓDULO]-[NÚMERO]` en dos dígitos (ej. `RF-CLI-01`)
- **Redacción:** verbo en infinitivo + sujeto + complemento
- **Granularidad:** un requisito = una capacidad atómica del sistema

### 6.2 Formato de requisitos no funcionales
- **ID único:** `RNF-[ÁREA]-[NÚMERO]` (ej. `RNF-SEG-01`)
- **Áreas válidas:** SEG (seguridad), REN (rendimiento), USA (usabilidad), MAN (mantenibilidad), POR (portabilidad)

### 6.3 Formato de historias de usuario
- **ID único:** `HU-[ROL]-[NÚMERO]` (ej. `HU-ADMIN-01`)
- **Plantilla obligatoria:** "Como [rol], quiero [acción] para [beneficio]"
- **Roles válidos:** ADMIN, MEC, CLI, AUTH, MOB
- **Criterios de aceptación:** lista de condiciones verificables en formato checklist
- **Trazabilidad:** cada HU referencia los RF que implementa
- **Estado:** puede ser `✅ Implementada`, `🔄 En progreso` o `❌ Pendiente`

### 6.4 Trazabilidad
Cada historia de usuario debe poder vincularse a:
1. Al menos un requisito funcional (campo "RF relacionados")
2. Al menos un componente o endpoint de la implementación

### 6.5 Criterios de priorización
| Prioridad | Criterio |
|-----------|---------|
| Alta | Necesaria para que el sistema funcione en producción |
| Media | Mejora la experiencia pero el sistema puede operar sin ella |
| Baja | Deseable a futuro, no planificada en esta versión |
