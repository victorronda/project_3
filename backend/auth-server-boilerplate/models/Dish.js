const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: String,
  typeItem: {type: String, enum: ['Dessert', 'Drinks', 'Appetizers', 'Entree', 'Second Course']},
  ingredients: Array,
  description: String,
  image: String,
  price: Number,
  tables: [{type: Schema.Types.ObjectId, ref: "Table"}]/*No se si al final es necesario este array porque
  al final el plato va en la order, quizás ponemos el array de orders??*/
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
