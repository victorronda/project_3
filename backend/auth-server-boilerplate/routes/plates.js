// Amalia
// Añadir, editar y borrar platos

const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const Plate = require("../models/Company");
const Table = require("../models/Table");
const Menu = require("../models/Menu");

const { isLoggedIn } = require("../helpers/middlewares");
router.use(isLoggedIn()); // Si no pusieramos este .use tendriamos que llamar a la función en cada ruta

// Create plate
router.post("/add/plate", async (req, res, next) => { 
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body;
    const companyId = req.session.currentUser._id;
    const plate = await Plate.create({ name, typeItem, ingredients, description, image, price, quantity });

    req.session.currentUser = await Plate.findByIdAndUpdate(
        { "_id": companyId }, 
        { $push: { plate: plate._id } }, // En este caso, habrá que hacer el push a Menu para que entre en el array que tiene de plates?
        { new: true }
        );

    res.json(plate);
})

// Edit plate
router.put("/plate/:_id/edit", async (req, res, next) => {
    const { _id } = req.params;
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body;
    const updatedPlate = await Plate.findByIdAndUpdate(
        { "_id": _id }, 
        { $set: {name, typeItem, ingredients, description, image, price, quantity} }, 
        { new: true });

    res.status(200).json(updatedPlate);
})

// Delete plate
router.delete("/plate/:_id/delete", async (req, res, next) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    
    try {
        await Plate.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: `Plate with ${req.params.id} deleted.` });
    } catch (err) {
        next(error)
    }

});

module.exports = router;