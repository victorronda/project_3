const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Menu = require('../models/Menu');
const Company = require('../models/Company');
const Table = require('../models/Table');
const Dish = require('../models/Dish');
const Order = require('../models/Order');

const {isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn());

// Rastaurar order para próximo cliente
router.post('/:_id/pay', async (req, res, next) => {

	//Order.collection.drop();

	try {
		const newOrder = await Order.create({quantity: req.body.quantity, dishesId: req.body.dishesId, tableId: req.params._id, bill: req.body.bill});
		await Table.findByIdAndUpdate(
			req.params._id,
			{ $push: {orders: newOrder} },
			{ new: true }
			);
		res.status(201).json({newOrder});

	} catch (err) {
		next(err);
	}
});

// Order (tarjetita amarilla) que llega a la cocina
router.put('/:_id', async (req,res,next) => {

    try {
		const updatedOrder = await Order.findByIdAndUpdate(req.params._id, req.body);
        res.status(201).json(updatedOrder);  

	} catch (error) {
		next(error);
    }
});

// Order que le llega al cliente
router.put('/:_id', async (req,res,next) => {

    try {
		const updatedOrder = await Order.findByIdAndUpdate(req.params._id, req.body);
        res.status(201).json(updatedOrder);  

	} catch (error) {
		next(error);
    }
});

module.exports = router;