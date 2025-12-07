-- --------------------------
-- CLIENTES
-- --------------------------
INSERT INTO cliente (nombre_completo, email, direccion, password, role)
VALUES ('Administrador', 'admin@taller.com', 'Calle Admin 1', 'admin123', 'admin');

INSERT INTO cliente (nombre_completo, email, direccion, password, role)
VALUES ('Juan Pérez', 'cliente@taller.com', 'Calle Falsa 123', 'cliente123', 'cliente');

INSERT INTO cliente (nombre_completo, email, direccion, password, role)
VALUES ('María García', 'maria@taller.com', 'Av. Principal 456', 'maria123', 'cliente');

INSERT INTO cliente (nombre_completo, email, direccion, password, role)
VALUES ('Carlos López', 'carlos@taller.com', 'Calle Real 789', 'carlos123', 'mecanico');

-- --------------------------
-- TELEFONOS DE CLIENTES
-- --------------------------
INSERT INTO cliente_telefonos (cliente_id, telefonos)
VALUES (1, '555-0001'),
       (1, '555-0002'),
       (2, '555-1234'),
       (3, '555-5678'),
       (4, '555-9012');

-- --------------------------
-- VEHICULOS
-- --------------------------
INSERT INTO vehiculo (marca, modelo, anio, placa, cliente_id)
VALUES ('Toyota', 'Corolla', 2020, 'ABC-123', 2),
       ('Honda', 'Civic', 2018, 'XYZ-987', 2),
       ('Ford', 'Focus', 2019, 'DEF-456', 3),
       ('Chevrolet', 'Cruze', 2021, 'GHI-789', 3);

-- --------------------------
-- MECANICOS
-- --------------------------
INSERT INTO mecanico (nombre_completo, especialidad, costo_hora)
VALUES ('Carlos López', 'Motor', 25.50),
       ('Ana Martínez', 'Electricidad', 30.00),
       ('Pedro Sánchez', 'Transmisión', 28.75);

-- --------------------------
-- SERVICIOS
-- --------------------------
INSERT INTO servicio (nombre, descripcion, precio_base)
VALUES ('Cambio de Aceite', 'Cambio de aceite y filtro', 45.00),
       ('Revisión General', 'Revisión completa del vehículo', 120.00),
       ('Alineación', 'Alineación y balanceo', 60.00);

-- --------------------------
-- ORDENES DE TRABAJO
-- --------------------------
INSERT INTO orden_de_trabajo (fecha_creacion, descripcion, costo_total, cliente_id, id_vehiculo, id_mecanico)
VALUES ('2024-12-01', 'Cambio de aceite y filtro', 45.00, 2, 1, 1),
       ('2024-12-03', 'Revisión de frenos', 150.00, 2, 2, 2),
       ('2024-12-05', 'Reparación de motor', 500.00, 3, 3, 1);

-- --------------------------
-- RELACION ORDENES-SERVICIOS
-- --------------------------
INSERT INTO orden_servicio (orden_id, servicio_id)
VALUES (1, 1),  -- Orden 1 tiene Cambio de Aceite
       (2, 2),  -- Orden 2 tiene Revisión General
       (2, 3),  -- Orden 2 también tiene Alineación
       (3, 1),  -- Orden 3 tiene Cambio de Aceite
       (3, 2);  -- Orden 3 también tiene Revisión General