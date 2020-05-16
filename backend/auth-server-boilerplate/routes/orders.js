const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Table = require('../models/Table');
const Order = require('../models/Order');

const { isLoggedIn, isNotLoggedIn, formFullfilled } = require('../helpers/middlewaresAd');
const { isLoggedInEm, isNotLoggedInEm, formFullfilledEm } = require('../helpers/middlewaresEm');

// Order
router.post('/add/:tableId', async (req, res, next) => {
	
	console.log("req.dishes", req.body.dishesId)
	const reqDishes = req.body.dishesId
	try {
		const newOrder = await Order.create(
			{quantity: reqDishes.map(elem => elem.quantity),
			dishesId: reqDishes, 
			tableId: req.params.tableId, 
			bill: req.body.bill})
			console.log("req.quantity", reqDishes.map(elem => elem.quantity))
		await Table.findByIdAndUpdate(
			req.params.tableId,
			{ $push: {orders: newOrder} },
			{ new: true }
			);
		res.status(201).json({newOrder});

	} catch (err) {
		next(err);
	}
});

// Orders list
router.get('/showAll', isLoggedIn(), async (req, res, next) => {

	try {
		const orders = await Order.find().populate('tableId')
		res.status(200).json(orders);

	} catch (error) {
		next(error);
	}
});

// Show order details
router.get('/:_id', async (req,res,next) => {

    try {
        const myOrder = await Order.findById(req.params._id)
		.populate('dishesId') 
        res.status(200).json(myOrder);

	} catch (error) {
		next(error);
    }

})

router.put('/:orderId/edit', async (req, res, next) => {
	
	try {
		const editOrder = await Order.findByIdAndUpdate(req.params.orderId, req.body);
		res.status(200).json({editOrder});

	} catch (err) {
		next(err);
	}
});

router.put('/:orderId/table/:tableId/confirm', async (req, res, next) => {

	try {
		await Table.findByIdAndUpdate(
			req.params.tableId,
			{ orders: [] },
			{ new: true }
			);
		const confirmOrder = await Table.findByIdAndUpdate(
			req.params.tableId,
			{ $push: {orders: req.params.orderId} },
			{ new: true }
			);
		res.status(200).json({confirmOrder});

	} catch (err) {
		next(err);
	}
});

router.delete('/staff/:orderId/table/:tableId/delete', async (req, res, next) => {

	try {
		await Order.findByIdAndRemove(req.params.orderId);
	
		await Table.findByIdAndUpdate(
			req.params.tableId, 
			{ $pull: { orders: req.params.orderId} }, 
			{ new: true }
			);
		res.status(200).json({ message: 'Order deleted' });

	} catch (error) {
		next(error);
	}
});

module.exports = router;