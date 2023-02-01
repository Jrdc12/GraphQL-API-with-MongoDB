require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

const mongoString = process.env.DATABASE_URL

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries and mutations

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .connect(mongoString, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected")
    return server.listen({ port: 8080 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
