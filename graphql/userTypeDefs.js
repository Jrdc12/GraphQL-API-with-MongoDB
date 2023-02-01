const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): String
    login(input: LoginInput!): User
  }
`
