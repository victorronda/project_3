const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  nameEmployee: Array, 
  email: String,
  passwordAdmin: String,
  passwordEmployee: String,
  menus: [{type: Schema.Types.ObjectId, ref: "Menu"}],
  tables: [{type: Schema.Types.ObjectId, ref: "Table"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;