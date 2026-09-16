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

```text
docs/
├── postman-testing.png
├── postman-create-pizza.png
├── postman-update-pizza.png
└── postman-delete-pizza.png
```

Estas imágenes pueden subirse al repositorio para dejar evidencia de la prueba de cada endpoint.

## Referencia técnica

La implementación usa el driver oficial `mongodb` para Node.js y sus operaciones `find`, `findOne`, `insertOne`, `updateOne` y `deleteOne`, siguiendo los ejemplos de CRUD de la documentación oficial de MongoDB:

https://www.mongodb.com/docs/drivers/node/current/usage-examples/