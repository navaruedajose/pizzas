// Esta es la capa donde se persisten los datos.
import { MongoClient } from "mongodb"

// Aquí está la cadena de conexión actualizada con root:123
const CADENA_CONEXION = process.env.MONGODB_URI ?? "mongodb://root:123@127.0.0.1:27017/?authSource=admin"
const NOMBRE_BASE_DATOS = process.env.MONGODB_DATABASE ?? "holamundo"
const clienteMongo = new MongoClient(CADENA_CONEXION)
const coleccionPizzas = clienteMongo.db(NOMBRE_BASE_DATOS).collection("pizzas")

let conexion

async function obtenerColeccionPizzas() {
  conexion ??= clienteMongo.connect()
  await conexion

  return coleccionPizzas
}

/**
 * Regresa una lista de las pizzas
 * @returns {Promise<Array>} Promesa que resuelve con todas las pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {
  const coleccion = await obtenerColeccionPizzas()

  return coleccion.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {number|string} id Identificador de la pizza que se desea buscar.
 * @returns {Promise<Object|undefined>} Promesa que resuelve con la pizza o `undefined`.
 */
export async function obtenerPizzaPorIdAsync(id) {
  const coleccion = await obtenerColeccionPizzas()

  return coleccion.findOne({ id: Number(id) }, { projection: { _id: 0 } })
}

/**
 * Agrega una pizza y regresa su identificador
 * @param {{nombre: string, descripcion: string}} pizza Datos de la pizza que se agregará.
 * @returns {Promise<number>} Promesa que resuelve con el identificador asignado.
 */
export async function agregarPizzaAsync(pizza) {
  const coleccion = await obtenerColeccionPizzas()
  const ultimaPizza = await coleccion.find().sort({ id: -1 }).limit(1).next()
  const id = ultimaPizza ? ultimaPizza.id + 1 : 1

  await coleccion.insertOne({ ...pizza, id })

  return id
}

/**
 * Actualiza el nombre y la descripción de una pizza.
 * @param {number|string} id Identificador de la pizza que se actualizará.
 * @param {{nombre: string, descripcion: string}} pizza Nuevos datos de la pizza.
 * @returns {Promise<Object|undefined>} Promesa que resuelve con la pizza actualizada o `undefined`.
 */
export async function actualizarPizzaAsync(id, pizza) {
  const coleccion = await obtenerColeccionPizzas()
  const resultado = await coleccion.updateOne(
    { id: Number(id) },
    { $set: { nombre: pizza.nombre, descripcion: pizza.descripcion } },
  )

  if (resultado.matchedCount === 0) {
    return undefined
  }

  return obtenerPizzaPorIdAsync(id)
}

/**
 * Elimina una pizza por su identificador.
 * @param {number|string} id Identificador de la pizza que se eliminará.
 * @returns {Promise<boolean>} Promesa que resuelve `true` si se eliminó o `false` si no existía.
 */
export async function eliminarPizzaAsync(id) {
  const coleccion = await obtenerColeccionPizzas()
  const resultado = await coleccion.deleteOne({ id: Number(id) })

  return resultado.deletedCount > 0
}