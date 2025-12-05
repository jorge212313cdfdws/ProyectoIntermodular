-- --------------------------
-- CLIENTES
-- --------------------------
INSERT INTO cliente (nombre_completo, email, direccion)
VALUES ('Administrador', 'admin@taller.com', 'Calle Admin 1');

INSERT INTO cliente (nombre_completo, email, direccion)
VALUES ('Juan Pérez', 'cliente@taller.com', 'Calle Falsa 123');

-- --------------------------
-- TELEFONOS DE CLIENTES
-- --------------------------
INSERT INTO cliente_telefonos (cliente_id, telefonos)
VALUES (1, '555-0001'),
       (1, '555-0002'),
       (2, '555-1234');

-- --------------------------
-- VEHICULOS
-- --------------------------
INSERT INTO vehiculo (marca, modelo, año, placa, cliente_id)
VALUES ('Toyota', 'Corolla', 2020, 'ABC-123', 2),
       ('Honda', 'Civic', 2018, 'XYZ-987', 2);