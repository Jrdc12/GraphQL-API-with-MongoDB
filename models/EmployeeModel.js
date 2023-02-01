const { Schema, model } = require('mongoose')

const employeeSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  salary: Number,
})

module.exports = model('Employee', employeeSchema)