const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plateSchema = new Schema({
  name: String,
  typeItem: {type: String, enum: ['Dessert', 'Drinks', 'Appetizers', 'Main Plate', 'Second Plate']},
  ingredients: Array,
  description: String,
  image: String,
  price: Number,
  quantity: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Plate = mongoose.model('Plate', plateSchema);

module.exports = Plate;