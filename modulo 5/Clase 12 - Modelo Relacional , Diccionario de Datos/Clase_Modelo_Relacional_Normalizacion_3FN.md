# Clase: Transformación, Normalización y Diccionario de Datos  

---

## 🎯 Objetivo de la clase
Comprender cómo se transforma un **Modelo Entidad–Relación** en un **Modelo Relacional**, reconocer y aplicar las **reglas de normalización hasta Tercera Forma Normal (3FN)** y entender la importancia del **diccionario de datos** como herramienta de documentación del diseño de bases de datos.

---

## 1️⃣ Del Modelo Entidad–Relación al Modelo Relacional

El **Modelo Entidad–Relación (E-R)** es un modelo **conceptual** que permite analizar y comprender un problema del mundo real, identificando entidades, atributos y relaciones sin considerar aún aspectos técnicos de implementación.

El **Modelo Relacional** es un modelo **lógico**, diseñado para ser implementado en un sistema gestor de bases de datos relacional (como PostgreSQL). En este modelo, la información se organiza en **tablas**, compuestas por filas y columnas.

### Diferencias principales

| Modelo E-R | Modelo Relacional |
|-----------|------------------|
| Conceptual | Lógico |
| Diagramas | Tablas |
| Entidades | Tablas |
| Atributos | Columnas |
| Relaciones | Claves foráneas |
| Independiente del SGBD | Dependiente del SGBD |

📌 *El modelo E-R explica el negocio; el modelo relacional permite implementarlo.*

---

## 2️⃣ Reglas de Transformación (E-R → Relacional)

Las reglas de transformación permiten convertir un modelo conceptual en un modelo relacional coherente.

### 🔹 Entidad → Tabla
- Cada entidad se transforma en una tabla.
- Cada atributo se transforma en una columna.

### 🔹 Identificador → Clave Primaria (PK)
- El identificador único de la entidad se convierte en la **Primary Key** de la tabla.
- Garantiza unicidad e integridad.

### 🔹 Relación 1 : N
- La PK del lado 1 se incorpora como **Foreign Key (FK)** en la tabla del lado N.

### 🔹 Relación 1 : 1
- La FK se ubica en la entidad con participación opcional o menor cantidad de atributos.

### 🔹 Relación N : M
- Se crea una **tabla intermedia**.
- Contiene las PK de ambas entidades como FK.
- Puede incluir atributos propios de la relación.

### 🔹 Entidades débiles
- Su clave primaria se compone de:
  - Su identificador parcial
  - La PK de la entidad fuerte

---

## 3️⃣ Asignación de Tipos de Datos y Restricciones

Una correcta definición de tipos y restricciones es clave para la calidad del modelo.

### Tipos de datos (conceptual)
- Numéricos
- Texto
- Fechas
- Lógicos

### Restricciones principales
- **PRIMARY KEY**: identifica de forma única cada registro.
- **FOREIGN KEY**: mantiene la integridad referencial.
- **NOT NULL**: obliga a ingresar un valor.
- **UNIQUE**: evita duplicidad.
- **CHECK**: valida reglas del negocio.

📌 *Las restricciones evitan errores antes de que los datos se almacenen.*

---

## 4️⃣ Normalización de Datos

La **normalización** es un proceso sistemático de diseño de bases de datos cuyo objetivo es organizar la información de manera correcta, reduciendo la redundancia y evitando problemas lógicos en el almacenamiento de los datos.

Normalizar no significa “dividir tablas porque sí”, sino aplicar reglas formales basadas en cómo los datos **dependen unos de otros**.

### Objetivos de la normalización
- Eliminar redundancia de datos
- Evitar inconsistencias
- Prevenir errores al insertar, actualizar o eliminar información
- Facilitar el mantenimiento y la escalabilidad del sistema

---

📌 Idea clave:
Las anomalías no son errores del motor de base de datos, son errores de diseño.

---

## 5️⃣ Formas Normales (hasta 3FN)

Las **formas normales** son niveles progresivos de calidad del diseño de una base de datos.  
Cada forma normal se apoya en la anterior y corrige problemas específicos.

---

## 🔹 Primera Forma Normal (1FN)

### Definición
Una tabla cumple Primera Forma Normal (1FN) si:
- Todos los atributos contienen valores atómicos (indivisibles).
- No existen campos multivaluados.
- No existen grupos repetidos.

### Concepto clave: Atributo atómico
Un atributo es atómico cuando almacena un solo valor y no una lista.

Ejemplo incorrecto:
telefonos = "1234, 5678"

Ejemplo correcto:
Una fila por teléfono.

---

## 🔹 Segunda Forma Normal (2FN)

### Definición
Una tabla cumple Segunda Forma Normal (2FN) si:
- Está en 1FN.
- Todos los atributos que no son clave dependen de la clave primaria completa.

### Conceptos clave

#### Clave primaria compuesta
Una clave primaria compuesta está formada por más de un atributo.

Ejemplo:
(id_pedido, id_producto)

#### Dependencia parcial
Ocurre cuando un atributo depende solo de una parte de la clave compuesta.

---

### Ejemplo que NO cumple 2FN

Tabla DETALLE_PEDIDO:
- id_pedido
- id_producto
- nombre_producto
- cantidad

Problema:
nombre_producto depende solo de id_producto, no de la clave completa.

Solución:
Separar la información del producto en su propia tabla.

---

## 🔹 Tercera Forma Normal (3FN)

### Definición
Una tabla cumple Tercera Forma Normal (3FN) si:
- Está en 2FN.
- No existen dependencias transitivas.

---

### Conceptos clave para entender la 3FN

#### Dependencia funcional
Un atributo B depende funcionalmente de un atributo A cuando un valor de A determina un único valor de B.

Ejemplo:
id_cliente → nombre_cliente

Esto significa que conociendo el id del cliente, sabemos exactamente su nombre.

---

#### Dependencia transitiva (explicación aplicada)

Existe una **dependencia transitiva** cuando un atributo NO depende directamente de la clave primaria, sino que depende de otro atributo que sí depende de la clave.

La forma general es:
PK → A → B

Donde:
- PK es la clave primaria
- A depende de la PK
- B depende de A (y no directamente de la PK)

---

### Ejemplo REAL de dependencia transitiva

Tabla PEDIDO (mal diseñada):

- id_pedido (PK)
- id_cliente (FK)
- nombre_cliente
- fecha_pedido

Relaciones implícitas:
- id_pedido → id_cliente
- id_cliente → nombre_cliente

Entonces:
- nombre_cliente NO depende directamente de id_pedido
- Depende de id_cliente

Esto es una dependencia transitiva:
id_pedido → id_cliente → nombre_cliente

---

### ¿Por qué esto es un problema?

- El nombre del cliente se repite en muchos pedidos
- Si el cliente cambia su nombre, hay que actualizar muchos pedidos
- Se generan inconsistencias y redundancia

---

### Solución correcta en 3FN

Tabla PEDIDO:
- id_pedido (PK)
- id_cliente (FK)
- fecha_pedido

Tabla CLIENTE:
- id_cliente (PK)
- nombre_cliente
- correo

Ahora:
- Cada atributo depende solo de la clave de su tabla
- No hay dependencia transitiva

---

📌 Regla fundamental de la Tercera Forma Normal (3FN):

Todo atributo debe depender solo de la clave primaria, de toda la clave y de nada más.

---

### Resumen didáctico final
- 1FN asegura estructura correcta
- 2FN asegura dependencias completas
- 3FN asegura que cada dato esté en el lugar correcto

Normalizar no complica la base de datos, evita problemas futuros.
---

## 6️⃣ Desnormalización

La **desnormalización** es el proceso inverso a la normalización, aplicado de forma controlada.

### ¿Cuándo se utiliza?
- Reportes frecuentes
- Consultas de alto rendimiento
- Sistemas de lectura intensiva

### Riesgos
- Redundancia
- Inconsistencias
- Mayor complejidad de mantenimiento

📌 *Se desnormaliza por razones técnicas, no por desconocimiento.*

---

## 7️⃣ Diccionario de Datos

El **diccionario de datos** documenta formalmente el modelo relacional.

### ¿Qué describe?
- Tablas
- Campos
- Tipos de datos
- Restricciones
- Claves primarias y foráneas

### Importancia
- Facilita el mantenimiento
- Permite trabajo colaborativo
- Preserva el conocimiento del sistema

```sql
SELECT
    c.table_schema   AS esquema,
    c.table_name     AS tabla,
    c.column_name    AS columna,
    c.data_type      AS tipo_dato,
    c.character_maximum_length AS longitud,
    c.numeric_precision AS precision,
    c.is_nullable    AS permite_null,
    c.column_default AS valor_por_defecto,

    -- Es Primary Key
    CASE
        WHEN pk.column_name IS NOT NULL THEN 'PK'
        ELSE ''
    END AS primary_key,

    -- Es Foreign Key
    CASE
        WHEN fk.column_name IS NOT NULL THEN 'FK'
        ELSE ''
    END AS foreign_key,

    fk.foreign_table_name  AS tabla_referenciada,
    fk.foreign_column_name AS columna_referenciada

FROM information_schema.columns c

-- Primary Keys
LEFT JOIN (
    SELECT
        kcu.table_schema,
        kcu.table_name,
        kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
    WHERE tc.constraint_type = 'PRIMARY KEY'
) pk
ON c.table_schema = pk.table_schema
AND c.table_name = pk.table_name
AND c.column_name = pk.column_name

-- Foreign Keys
LEFT JOIN (
    SELECT
        kcu.table_schema,
        kcu.table_name,
        kcu.column_name,
        ccu.table_name  AS foreign_table_name,
        ccu.column_name AS foreign_column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
) fk
ON c.table_schema = fk.table_schema
AND c.table_name = fk.table_name
AND c.column_name = fk.column_name

WHERE c.table_schema = 'public'
ORDER BY c.table_name, c.ordinal_position;

```




📌 *Una base de datos sin diccionario es difícil de entender y mantener.*

---

## 🧠 Cierre de la clase
- El modelo relacional se deriva del E-R.
- La normalización asegura calidad y consistencia.
- El diccionario de datos asegura comprensión y documentación.
