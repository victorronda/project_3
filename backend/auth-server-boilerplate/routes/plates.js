// Amalia
// Añadir, editar y borrar platos
/*
ME PERDI!
En Plato.js no tenemos vinculación con ningún otro modelo porque ya este se encontraba
dentro de Menu.js y pensamos que no hacía falta
Pregunta: A la hora de crearlos desde la página principal del admin (Add Plate), 
de donde se hace el GET? A partir de que Id? Sea cual sea ese Id, va a tener que estar 
dentro de Plato.js? O se puede crear de la "nada"?
*/

const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const Plate = require("../models/Company");
const Table = require("../models/Table");
const Menu = require("../models/Menu");

const { isLoggedIn } = require("../helpers/middlewares");
router.use(isLoggedIn()); // Si no pusieramos este .use tendriamos que llamar a la función en cada ruta

router.get("/createPlate", async (req, res, next) => {
    const plates = await Plate.find().populate("company")
    res.json(plates)
})

router.get("/:companyId", async (req, res, next) => {
    const { companyId } = req.params;
    const plate = await Plate.findById({ "_id": plateId })
    res.json(plate)
})

router.post("/", async (req, res, next) => { 
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body;
    const companyId = req.session.currentUser._id;
    const plate = await Plate.create({name, typeItem, ingredients, description, image, price, quantity});

    const updatedPlate = await Plate.findByIdAndUpdate({ "_id": companyId }, { $push: { plate: plate._id } }, { new: true });

    req.session.currentUser = updatedPlate;

    res.json(plate);
})

router.put("/:plateId", async (req, res, next) => {
    const { plateId } = req.params
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body
    const updatedPlate = await Plate.findByIdAndUpdate({ "_id": plateId }, {
        $set: {name, typeItem, ingredients, description, image, price, quantity}}, { new: true });

    res.json(updatedPlate)
})

router.delete("/:plateId", async (req, res, next) => {
    const { plateId } = req.params
    const del = await Plate.findByIdAndDelete({ "_id": plateId })
    const platesUpdated = await Plate.find({ "user": req.session.currentUser._id })

    req.session.currentUser.plates = platesUpdated;
    res.json(req.session.currentUser);
})

module.exports = router;