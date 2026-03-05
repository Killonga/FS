# Modulo 7 - Ejercicio 2

En caso de no tener la base de usuarios proporcionada en el ejercicio, se puede ejecutar docker compose para levantar la base. En caso de contar con la base omitir el paso 2.

## Paso 1

Revisar variables de entorno

## Paso 2

Ejecutar docker compose

> _**Nota :** Para ejecutar el paso 2, es importante tener instalado docker_

```docker
docker compose up -d
```

## Paso 3

Ejecutar app.js

```js
node app.js
```

## Paso 4

El servidor estara escuchando en localhost:3000, para saber si la base de datos esta conectada, puedes consultar en :

[Health](http://localhost:3000/health)

Para consultar por los usuarios de la base

[Usuarios](http://localhost:3000/usuarios)

Mediante query params puedes especificar un email para hacer una busqueda por correo de usuario, ejemplo:

http://localhost:3000/usuarios?email=correo@prueba.com
