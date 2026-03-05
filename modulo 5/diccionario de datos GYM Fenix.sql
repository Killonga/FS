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