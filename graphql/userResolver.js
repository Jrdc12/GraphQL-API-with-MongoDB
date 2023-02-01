const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

module.exports = {
  Query: {
    async getUser(_, { id }) {
      return await User.findById(id)
    },
    async getUsers() {
      return await User.find()
    },
  },
  Mutation: {
    async createUser(_, { input: { username, email, password } }) {
      const hashedPassword = await bcrypt.hash(password, 12)

      if (!username || !email || !password) {
        throw new Error("One or more fields are empty")
      }

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      })
      const user = await newUser.save()
      return user
    },

    async updateUser(_, { id, input: { username, email, password } }) {
      const hashedPassword = await bcrypt.hash(password, 12)

      if (!username || !email || !password) {
        throw new Error("One or more fields are empty")
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: { username, email, password: hashedPassword } },
        { new: true }
      )
      return updatedUser
    },

    async deleteUser(_, { id }) {
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        throw new Error("User not found")
      }
      return "User deleted"
    },

    async login(_, { input: { email, password } }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error("User not found")
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        throw new Error("Incorrect password")
      }
      // change return value to logged in
      return user
    },
  },
}
