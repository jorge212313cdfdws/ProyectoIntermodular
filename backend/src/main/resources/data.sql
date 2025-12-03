-----------------------------------------------------
-- CLIENTES (usuarios del sistema)
-----------------------------------------------------

WITH admin AS (
    INSERT INTO cliente (nombre, email, direccion)
    VALUES ('Administrador', 'admin@taller.com', 'Calle Admin 1')
    RETURNING id_cliente
),
cliente1 AS (
    INSERT INTO cliente (nombre, email, direccion)
    VALUES ('Juan Pérez', 'cliente@taller.com', 'Calle Falsa 123')
    RETURNING id_cliente
)

-----------------------------------------------------
-- TELEFONO_CLIENTE
-----------------------------------------------------
INSERT INTO telefono_cliente (telefono, id_cliente)
SELECT '600123456', id_cliente FROM admin
UNION ALL
SELECT '600654321', id_cliente FROM cliente1;


-----------------------------------------------------
-- VEHICULO
-----------------------------------------------------
WITH veh_admin AS (
    INSERT INTO vehiculo (id_cliente, placa, marca, modelo, año, "Nº_chasis")
    SELECT id_cliente, 'ADMIN123', 'Ford', 'Fiesta', 2018, 'CHASISADMIN' FROM admin
    RETURNING id_vehiculo
),
veh_cliente AS (
    INSERT INTO vehiculo (id_cliente, placa, marca, modelo, año, "Nº_chasis")
    SELECT id_cliente, '1234ABC', 'Toyota', 'Corolla', 2015, 'CHASIS12345' FROM cliente1
    RETURNING id_vehiculo
)

-----------------------------------------------------
-- MECANICO
-----------------------------------------------------
WITH mecanico1 AS (
    INSERT INTO mecanico (nombre, especialidad, horas_trabajadas)
    VALUES ('Carlos Gómez', 'Motor', 0)
    RETURNING id_mecanico
)

-----------------------------------------------------
-- ORDEN DE TRABAJO
-----------------------------------------------------
WITH orden1 AS (
    INSERT INTO orden_de_trabajo (id_cliente, matricula, id_mecanico, fecha_creacion, descripcion, estado, total)
    SELECT c.id_cliente, v.placa, m.id_mecanico, '2025-01-01', 'Cambio de aceite y revisión general', 'En Progreso', 0
    FROM cliente1 c
    CROSS JOIN veh_cliente v
    CROSS JOIN mecanico1 m
    RETURNING id_orden
)

-----------------------------------------------------
-- FACTURA
-----------------------------------------------------
INSERT INTO factura (id_orden, fecha_facttura, total, estado_pago)
SELECT id_orden, '2025-01-01', 0, 'Pendiente'
FROM orden1;

-----------------------------------------------------
-- PARTE
-----------------------------------------------------
WITH parte1 AS (
    INSERT INTO parte (nombre, stock, precio)
    VALUES ('Filtro de Aceite', 20, 15.99)
    RETURNING id_parte
)

-----------------------------------------------------
-- SERVICIO
-----------------------------------------------------
WITH servicio1 AS (
    INSERT INTO servicio (nombre, costo_hora)
    VALUES ('Cambio de Aceite', 25.00)
    RETURNING id_servicio
)

-----------------------------------------------------
-- USA (Orden usa partes)
-----------------------------------------------------
INSERT INTO usa (id_orden, id_parte, cantidad)
SELECT o.id_orden, p.id_parte, 1
FROM orden1 o
CROSS JOIN parte1 p;

-----------------------------------------------------
-- INCLUYE (Orden incluye servicios)
-----------------------------------------------------
INSERT INTO incluye (id_orden, id_servicio, horas_servicio)
SELECT o.id_orden, s.id_servicio, 1.5
FROM orden1 o
CROSS JOIN servicio1 s;
