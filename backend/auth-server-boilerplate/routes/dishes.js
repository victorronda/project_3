const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");
const uploadCloud = require('../config/cloudinary.js');

const { isLoggedIn } = require("../helpers/middlewares");
router.use(isLoggedIn()); 

// Create Dish ///OJOOOOO FALTA REVISAR EL PROBLEMILLA DEL IMAGE FILE // Se hace desde react?
router.post("/add", uploadCloud.single('image'), async (req, res, next) => { 

    const { name, typeItem, ingredients, description, price, quantity } = req.body;
    /* const image = req.file.secureUrl; Nos da problemas al coger el file */

    try{
        const dish = await Dish.create({ name, typeItem, ingredients, description, price, quantity });
        /* Falta poner image dentro del create cuando solucionemos el problema de la linea 19 */
        res.status(201).json(dish);

    } catch(err) {
        console.log('You have the error: ', err);
        next(err);
    } 
})

// Dishes List 
router.get('/showAll', async (req,res, next) => {

    try {
        const allDishes = await Dish.find()
        res.status(200).json(allDishes);

	} catch (error) {
		next(error);
    }
})

// A dish, in particular (see details) 
router.get('/:_id', async (req,res,next) => {

    try {
        const myDish = await Dish.findById(req.params._id)      
        res.status(200).json(myDish);

	} catch (error) {
		next(error);
    }

})

// Edit dish
router.put("/:_id/edit", async (req, res, next) => {  

    const { name, typeItem, ingredients, description, price, quantity } = req.body;
    //Quito de dentro la image

    try{
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params._id, 
            { $set: {name, typeItem, ingredients, description, price, quantity} }, 
            //Quito de dentro la image
            { new: true });
        res.status(200).json(updatedDish);

    } catch(err) {
        console.log('You have the error: ', err);
        next(err);
    }
})

// Delete dish
router.delete("/:_id/delete", async (req, res, next) => {
    
    try {
        await Dish.findByIdAndRemove(req.params._id);
        res.status(200).json({ message: `Dish with ${req.params._id} deleted.` });
        
    } catch (err) {
        next(error)
    }

});

module.exports = router;