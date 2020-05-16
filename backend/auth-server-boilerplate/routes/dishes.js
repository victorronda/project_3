const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");
//const uploadCloud = require('../config/cloudinary.js');

const { isLoggedIn, isNotLoggedIn, formFullfilled } = require('../helpers/middlewaresAd');
const { isLoggedInEm, isNotLoggedInEm, formFullfilledEm } = require('../helpers/middlewaresEm');

// Dishes list 
router.get('/showAll', async (req,res, next) => {

    try {
        const allDishes = await Dish.find()
        res.status(200).json(allDishes);

	} catch (error) {
		next(error);
    }
})

// A dish (see details) 
router.get('/:_id', async (req,res,next) => {

    try {
        const myDish = await Dish.findById(req.params._id)      
        res.status(200).json(myDish);

	} catch (error) {
		next(error);
    }

})

// Create dish
router.post("/add", async (req, res, next) => { 

    const { name, typeItem, ingredients, description, price, quantity } = req.body;
    
    try {
        const dish = await Dish.create(
            {name, typeItem, ingredients, description, price, quantity}
            );

        res.status(201).json(dish);

    } catch(err) {
        console.log('You have the error: ', err);
        next(err);
    } 
})

// Edit dish
router.put("/:_id/edit", async (req, res, next) => {  

    const { name, typeItem, ingredients, description, price, quantity } = req.body;

    try{
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params._id, 
            { $set: {name, typeItem, ingredients, description, price, quantity} },
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
        res.status(200).json({ message: `Dish with ${req.params._id} id deleted.` });
        
    } catch (err) {
        next(error)
    }

});

module.exports = router;