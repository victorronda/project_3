const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  number: Number, 
  plates: [{type: Schema.Types.ObjectId, ref: "Plate"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;