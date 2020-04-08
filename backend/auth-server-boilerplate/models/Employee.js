const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: String,
  password: String,
  companyId: [{type: Schema.Types.ObjectId, ref: "Company"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;