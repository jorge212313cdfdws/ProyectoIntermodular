-- --------------------------
-- CLIENTES
-- --------------------------
INSERT INTO cliente (nombre_completo, email, direccion, password, role) VALUES
('Administrador', 'admin@taller.com',   'Calle Admin 1',     'admin123',   'admin'),
('Juan Pérez',    'cliente@taller.com', 'Calle Falsa 123',   'cliente123', 'cliente'),
('María García',  'maria@taller.com',   'Av. Principal 456', 'maria123',   'cliente'),
('Carlos López',  'carlos@taller.com',  'Calle Real 789',    'carlos123',  'mecanico');

-- --------------------------
-- VEHICULOS
-- --------------------------
INSERT INTO vehiculo (marca, modelo, anio, placa, cliente_id) VALUES
('Toyota',    'Corolla', 2020, 'ABC-123', (SELECT id FROM cliente WHERE email = 'cliente@taller.com')),
('Honda',     'Civic',   2018, 'XYZ-987', (SELECT id FROM cliente WHERE email = 'cliente@taller.com')),
('Ford',      'Focus',   2019, 'DEF-456', (SELECT id FROM cliente WHERE email = 'maria@taller.com')),
('Chevrolet', 'Cruze',   2021, 'GHI-789', (SELECT id FROM cliente WHERE email = 'maria@taller.com'));

-- --------------------------
-- MECANICOS
-- --------------------------
INSERT INTO mecanico (nombre, especialidad, horas_trabajadas) VALUES
('Carlos López',  'Motor',        0),
('Ana Martínez',  'Electricidad', 0),
('Pedro Sánchez', 'Transmisión',  0);

-- --------------------------
-- SERVICIOS
-- --------------------------
INSERT INTO servicio (nombre, descripcion, costo_hora) VALUES
('Cambio de Aceite', 'Cambio de aceite y filtro',        45.00),
('Revisión General', 'Revisión completa del vehículo',  120.00),
('Alineación',       'Alineación y balanceo',            60.00);

-- --------------------------
-- ORDENES DE TRABAJO
-- --------------------------
INSERT INTO orden_de_trabajo (fecha_creacion, descripcion, costo_total, cliente_id, id_vehiculo, id_mecanico) VALUES
('2024-12-01', 'Cambio de aceite y filtro', 45.00,
    (SELECT id FROM cliente WHERE email = 'cliente@taller.com'),
    (SELECT id FROM vehiculo WHERE placa = 'ABC-123'),
    (SELECT id FROM mecanico WHERE nombre = 'Carlos López')),
('2024-12-03', 'Revisión de frenos', 150.00,
    (SELECT id FROM cliente WHERE email = 'cliente@taller.com'),
    (SELECT id FROM vehiculo WHERE placa = 'XYZ-987'),
    (SELECT id FROM mecanico WHERE nombre = 'Ana Martínez')),
('2024-12-05', 'Reparación de motor', 500.00,
    (SELECT id FROM cliente WHERE email = 'maria@taller.com'),
    (SELECT id FROM vehiculo WHERE placa = 'DEF-456'),
    (SELECT id FROM mecanico WHERE nombre = 'Carlos López'));

-- --------------------------
-- RELACION ORDENES-SERVICIOS
-- --------------------------
INSERT INTO orden_servicio (orden_id, servicio_id) VALUES
(1, 1), (2, 2), (2, 3), (3, 1), (3, 2);
