require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { merge } = require("lodash");

const mongoString = process.env.DATABASE_URL;

// Apollo Server
// typeDefs: GraphQL Type Definitions
// resolvers: How do we resolve queries and mutations

const employeeTypeDefs = require("./graphql/employeeTypeDefs");
const employeeResolvers = require("./graphql/employeeResolvers");
const userTypeDefs = require("./graphql/userTypeDefs");
const userResolvers = require("./graphql/userResolver");

async function startServer() {
  const server = new ApolloServer({
    typeDefs: [employeeTypeDefs, userTypeDefs],
    resolvers: merge(employeeResolvers, userResolvers),
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await mongoose.connect(mongoString, { useNewUrlParser: true });
  console.log("MongoDB Connected");

  app.listen({ port: 8080 }, () =>
    console.log(`Server running at http://localhost:8080${server.graphqlPath}`)
  );
}

startServer();
