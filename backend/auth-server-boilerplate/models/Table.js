const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  number: Number, 
  companyId: [{type: Schema.Types.ObjectId, ref: "Company"}],
  orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;