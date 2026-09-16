import express from "express";
import {
  obtenerTodasLasPizzasAsync,
  obtenerPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  eliminarPizzaAsync,
} from './repositorios/pizza.repositorio.js'

const app = express();
const PORT = 3000; // Puerto en el que escuchará el servidor

//Configuración para usar el body en un metodo/verbo POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()
  return res.status(200).json(pizzas);
});

app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  if (!pizza) {
    return res.status(404).json({ mensaje: "Pizza no encontrada" });
  }

  return res.status(200).json(pizza);
});

app.post("/api/v1/pizzas", async (req, res) => {
  const id = await agregarPizzaAsync(req.body)
  const idDto = { id, fecha: new Date().toISOString() }

  return res.status(201).json(idDto);
});

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  if (!pizza) {
    const mensaje = { mensaje: "No existe la pizza con ese id" }
    return res.status(404).json(mensaje);
  }

  await actualizarPizzaAsync(id, req.body)

  const mensaje = { mensaje: "Datos actualizados" }
  return res.status(202).json(mensaje)
});

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const pizzaBorrada = await eliminarPizzaAsync(req.params.id)

  if (!pizzaBorrada) {
    return res.status(404).json({ mensaje: "Pizza no encontrada" });
  }

  return res.status(204).send();
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando en el puerto http://localhost:${PORT}` ,
  );
});