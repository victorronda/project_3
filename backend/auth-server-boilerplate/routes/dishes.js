// Amalia
// Añadir, editar y borrar platos

const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const Dish = require("../models/Dish");
const Table = require("../models/Table");
const Menu = require("../models/Menu");

const { isLoggedIn } = require("../helpers/middlewares");
router.use(isLoggedIn()); // Si no pusieramos este .use tendriamos que llamar a la función en cada ruta

// Create Dish
router.post("/add/dish", async (req, res, next) => { 
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body;
    const companyId = req.session.currentUser;
    const dish = await Dish.create({ name, typeItem, ingredients, description, image, price, quantity });

    req.session.currentUser = await Dish.findByIdAndUpdate(
        { "_id": companyId }, 
        { $push: { dish: dish._id } }, // En este caso, habrá que hacer el push a Menu para que entre en el array que tiene de dishes?
        { new: true }
        );

    res.json(dish);
})

// Edit dish
router.put("/dish/:_id/edit", async (req, res, next) => {
    const { _id } = req.params;
    const { name, typeItem, ingredients, description, image, price, quantity } = req.body;
    const updatedDish = await Dish.findByIdAndUpdate(
        { "_id": _id }, 
        { $set: {name, typeItem, ingredients, description, image, price, quantity} }, 
        { new: true });

    res.status(200).json(updatedDish);
})

// Delete dish
router.delete("/dish/:_id/delete", async (req, res, next) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    
    try {
        await Dish.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: `Dish with ${req.params.id} deleted.` });
    } catch (err) {
        next(error)
    }

});

module.exports = router;