require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")


module.exports = {
  Query: {
    async getUser(_, { id }, context) {
      try {
        jwt.verify(context.token, process.env.JWT_SECRET)
        return await User.findById(id)
      } catch (err) {
        throw new Error("Not authenticated")
      }
    },
    async getUsers(context) {
      try {
        jwt.verify(context.token, process.env.JWT_SECRET)
        return await User.find()
      } catch (err) {
        throw new Error("Not authenticated")
      }
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

    async updateUser(_, { id, input: { username, email, password } }, context) {
      try {
        jwt.verify(context.token, process.env.JWT_SECRET)
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
      } catch (err) {
        throw new Error("Not authenticated")
      }
    },

    async deleteUser(_, { id }, context) {
      try {
        jwt.verify(context.token, process.env.JWT_SECRET)
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
          throw new Error("User not found")
        }
        return "User deleted"
      } catch (err) {
        throw new Error("Not authenticated")
      }
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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      })
      return {
        token,
        user,
      }
    },
  },
}
