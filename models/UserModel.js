const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    primaryKey: true,
    maxLength: 100,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
})

module.exports = model("User", userSchema)
