CREATE DATABASE taller_mecanico;

-- Conectar a la BD
\c taller_mecanico;

-- Tabla de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de vehículos
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(20) NOT NULL UNIQUE,
    anio INTEGER,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT INTO clientes (nombre_completo, email, direccion) VALUES
('Admin User', 'admin@taller.com', 'Calle Admin 123'),
('Juan Pérez', 'juan@example.com', 'Calle Principal 456'),
('María García', 'maria@example.com', 'Avenida Central 789');

-- Insertar vehículos de prueba
INSERT INTO vehiculos (marca, modelo, placa, anio, cliente_id) VALUES
('Toyota', 'Corolla', 'ABC-1234', 2020, 2),
('Honda', 'Civic', 'XYZ-5678', 2021, 2),
('Ford', 'Focus', 'DEF-9012', 2022, 3);

-- Crear índices
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_vehiculos_placa ON vehiculos(placa);
CREATE INDEX idx_vehiculos_cliente_id ON vehiculos(cliente_id);