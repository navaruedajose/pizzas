import express from "express";
import {
  obtenerTodasLasPizzasAsync,
  obtenerPizzaPorIdAsync,
  actualizarPizzaAsync,
  borrarPizzaAsync,
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

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const pizza = await actualizarPizzaAsync(req.params.id, req.body)

  if (!pizza) {
    return res.status(404).json({ mensaje: "Pizza no encontrada" });
  }

  return res.status(200).json(pizza);
});

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const pizzaBorrada = await borrarPizzaAsync(req.params.id)

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