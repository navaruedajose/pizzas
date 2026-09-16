<img width="1308" height="820" alt="postman-delete-pizza" src="https://github.com/user-attachments/assets/c1f4d454-182c-4ef5-8b16-009a1c6c6c2a" />
<img width="1308" height="820" alt="postman-delete-pizza" src="https://github.com/user-attachments/assets/f39583f9-86c2-486a-bf53-5ae9540e08db" />
# CRUD de pizzas con Node.js y MongoDB

API REST para administrar pizzas usando Express y MongoDB. La persistencia se realiza en la colección `pizzas` de la base de datos `holamundo`.

## Requisitos

- Node.js 18 o superior
- Docker Desktop
- Postman

## Instalación

```bash
npm install
```

Inicia MongoDB con Docker:

```bash
docker run --name mongo-pizzas -p 27017:27017 -d mongo
```

La cadena de conexión local usada por defecto es `mongodb://localhost:27017`. También puede configurarse con variables de entorno:

```powershell
$env:MONGODB_URI="mongodb://localhost:27017"
$env:MONGODB_DATABASE="holamundo"
```

## Ejecución

```bash
npm run dev
```

La API queda disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/v1/pizzas` | Lista todas las pizzas |
| GET | `/api/v1/pizzas/:id` | Consulta una pizza |
| POST | `/api/v1/pizzas` | Crea una pizza |
| PUT | `/api/v1/pizzas/:id` | Actualiza una pizza |
| DELETE | `/api/v1/pizzas/:id` | Elimina una pizza |

Ejemplo de cuerpo para `POST` y `PUT`:

```json
{
  "nombre": "Hawaiana",
  "descripcion": "Jamón y piña"
}
```

## Pruebas con Postman

Importa `postman/pizzas-crud.collection.json` en Postman y ejecuta las solicitudes en orden. La colección usa `http://localhost:3000` como URL base.

Después de ejecutar la colección, toma una captura de la ejecución en Postman y guárdala en `docs/postman-testing.png` para adjuntarla al repositorio.

## Capturas de Postman

Se pueden adjuntar aquí las capturas de pantalla de la ejecución de la colección para documentar el CRUD de pizzas.

Estructura sugerida:

text
<img width="1517" height="1192" alt="image" src="https://github.com/user-attachments/assets/6539ab1b-f432-4cf4-9420-195fd35d2c91" />

<img width="1597" height="1052" alt="image" src="https://github.com/user-attachments/assets/77d21c80-7dbf-4f2b-a877-1b6e305fc56e" />

<img width="1323" height="949" alt="image" src="https://github.com/user-attachments/assets/fd963a91-a438-4cb7-abe0-25122f542242" />
<img width="1448" height="884" alt="image" src="https://github.com/user-attachments/assets/7019f6b3-5b11-436e-9d64-69de44161ee0" />
<img width="1376" height="891" alt="image" src="https://github.com/user-attachments/assets/4e6f5180-f9ad-4518-9387-1a46b166585e" />

<img width="1308" height="820" alt="postman-delete-pizza" src="https://github.com/user-attachments/assets/fa855aa9-5314-4811-8baf-ab17f0c1e89f" />

```

Estas imágenes pueden subirse al repositorio para dejar evidencia de la prueba de cada endpoint.

## Referencia técnica

La implementación usa el driver oficial `mongodb` para Node.js y sus operaciones `find`, `findOne`, `insertOne`, `updateOne` y `deleteOne`, siguiendo los ejemplos de CRUD de la documentación oficial de MongoDB:

https://www.mongodb.com/docs/drivers/node/current/usage-examples/
