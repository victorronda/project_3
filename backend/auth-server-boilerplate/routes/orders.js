const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const Table = require('../models/Table');
const Order = require('../models/Order');

const {isLoggedIn} = require('../helpers/middlewares');
router.use(isLoggedIn());

// NOTA: Preguntar si los calculos de bill son aqui o en el front

// Rastaurar order para próximo cliente
router.post('/add/:tableId/', async (req, res, next) => {

	try {
		const newOrder = await Order.create({quantity: req.body.quantity, dishesId: req.body.dishesId, tableId: req.params.tableId, bill: req.body.bill});
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