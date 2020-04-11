const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  dishesId: [{type: Schema.Types.ObjectId, ref: "Dish"}],
  tableId: [{type: Schema.Types.ObjectId, ref: "Table"}],
  quantity: Array,
  bill: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;