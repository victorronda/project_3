const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  number: Number, 
  dishes: [{type: Schema.Types.ObjectId, ref: "Dish"}],
  companyId: [{type: Schema.Types.ObjectId, ref: "Company"}],
  bill: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;