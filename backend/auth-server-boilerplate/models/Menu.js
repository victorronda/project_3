const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: String,
  plates: [{type: Schema.Types.ObjectId, ref: "Plate"}],
  companyId: [{type: Schema.Types.ObjectId, ref: "Company"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;