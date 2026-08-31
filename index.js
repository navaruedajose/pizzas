const express = require("express");
const app = express();
const PORT = 3000; 


app.get("/api/v1/pizzas", (req, res) => {
    const listaPizzas = [
        { id: 1, especialidad: "Pepperoni" },
        { id: 2, especialidad: "Hawaiana" },
        { id: 3, especialidad: "Mexicana" },
        { id: 4, especialidad: "Cuatro Quesos" }
    ];
    return res.json({ pizzas: listaPizzas });
});


app.get("/api/v1/tamaños", (req, res) => {
    const listaTamaños = ["Chica", "Mediana", "Grande", "Jumbo", "Familiar"];
    return res.json({ tamanios: listaTamaños });
});


app.get("/api/v1/bebidas", (req, res) => {
    const listaBebidas = ["Refresco de Cola", "Agua de Horchata", "Limonada", "Té Helado"];
    return res.json({ bebidas: listaBebidas });
});


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});