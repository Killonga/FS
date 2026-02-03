# Base de datos GYM Fenix

## Paso 1 : Modelo Conceptual

**A) Entidades**

- Socios
- clases
- Entrenadores
- Inscripciones

**B) Atributos e identificadores**

Socios

- socio_id (PK)
- nombre
- apellido
- email

Entrenadores

- entrenador_id (PK)
- nombre
- especialidad

Clases

- clase_id (PK)
- nombre
- horario
- entrenador_id (FK)

Inscripciones

- inscripcion_id (PK)
- clase_id (FK)
- socio_id (FK)
- fecha_inscripcion

**C) Define las Relaciones**

- Entrenador -> clases en una relacion 1:N
- Socio -> clases en una relacion N:M (Se utiliza tabla intermedia "inscripciones")

## Paso 2: Modelo Relacional

Socio

- socio_id (PK, SERIAL)
- nombre (VARCHAR(100), NOT NULL)
- apellido (VARCHAR(100), NOT NULL)
- email (VARCHAR(100), NOT NULL, UNIQUE)

Entrenador

- entrenador_id (PK, SERIAL)
- nombre (VARCHAR(100), NOT NULL)
- especialidad (VARCHAR(100), NOT NULL)

clases

- clase_id (PK, SERIAL)
- nombre (VARCHAR(100), NOT NULL)
- horario (VARCHAR(100), NOT NULL)
- entrenador_id (FK, NOT NULL, INT)

inscripciones

- inscripcion_id (PK, SERIAL)
- clase_id (FK, INT, NOT NULL)
- socio_id (FK, INT, NOT NULL)
- fecha_inscripcion (DATE)

## Paso 3: Justificación de Normalización

- Si no normalizamos, podríamos repetir datos de socios o entrenadores en últiples      registros de clases.  

- Facilitar el mantenimiento y escalabilidad ( facilita agregar nuevas entidades (por ejemplo, Planes de Membresía) sin alterar la estructura básica.)

-Asegurar integridad referencial. Las claves primarias y foráneas garantizan que las relaciones entre tablas sean válidas.

Ejemplo: no se puede inscribir un socio inexistente en una clase.

## Paso 4: Diccionario de Datos

