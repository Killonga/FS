# Clase: DDL (Data Definition Language) en SQL – Sistema de Exportaciones
## Objetivo de la clase
Construir paso a paso la estructura de una base de datos para un sistema simple de exportaciones, aplicando Lenguaje de Definición de Datos (DDL), creación de tablas, tipos de datos en PostgreSQL, llaves primarias, llaves foráneas y relaciones entre tablas, utilizando campos de fecha para representar eventos del negocio.
## Contexto del ejercicio
Una empresa dedicada a la exportación de productos necesita un sistema que permita registrar sus ventas internacionales y gestionar las entregas asociadas, controlando su origen, destino, fechas relevantes y el estado de cada envío. En esta clase nos enfocaremos exclusivamente en la definición de la estructura de la base de datos, sin abordar inserciones ni consultas de datos.

- cliente a quien se le entrega
- campos columnas : fecha, origen, destino
- tabla de ventas, tabla de envios
- campo: medio_envio(aereo, naval, terrestre)
- tabla productos, table pedidos


## ¿Qué es DDL?
DDL (Data Definition Language) corresponde al conjunto de sentencias SQL utilizadas para definir, modificar y eliminar la estructura de una base de datos. A diferencia de DML, que trabaja sobre los datos, DDL trabaja sobre la forma y organización de la información.
Las principales sentencias DDL son:
- CREATE
- ALTER
- DROP
- TRUNCATE
## CREATE: Creación de estructuras
### Creación de la tabla de ventas de exportación
```sql
CREATE TABLE ventas_exportacion (
    id_venta SERIAL PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    pais_destino VARCHAR(80) NOT NULL,
    monto_usd NUMERIC(12,2) NOT NULL,
    fecha_venta DATE NOT NULL
);
```
### Creación de la tabla de estados de entrega
```sql
CREATE TABLE estados_entrega (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150)
);
```
### Creación de la tabla de entregas
```sql
CREATE TABLE entregas (
    id_entrega SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    fecha_salida DATE NOT NULL,
    fecha_llegada_estimada DATE,
    id_estado INT NOT NULL,
    CONSTRAINT fk_venta FOREIGN KEY (id_venta) REFERENCES ventas_exportacion(id_venta),
    CONSTRAINT fk_estado FOREIGN KEY (id_estado) REFERENCES estados_entrega(id_estado)
);
```
## ALTER
```sql
ALTER TABLE entregas
ADD COLUMN fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

--Para agregar una relacion entre tablas existentes
ALTER TABLE entregas
ADD CONSTRAINT fk_estado_entrega
FOREIGN KEY (id_estado)
REFERENCES estados_entrega(id_estado);

```
## DROP
```sql
DROP TABLE entregas;
```
## TRUNCATE
```sql
TRUNCATE TABLE entregas;
```
## Cierre conceptual
DDL define el esqueleto del sistema. Un diseño correcto de tablas y relaciones asegura la consistencia y escalabilidad de un sistema.
