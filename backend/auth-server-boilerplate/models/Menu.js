const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: String,
  plates: [{type: Schema.Types.ObjectId, ref: "Plate"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;