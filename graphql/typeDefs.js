const { gql } = require("apollo-server")

// Type Definitions for employees
module.exports = gql`
  type Employee {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Int!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Int!
  }

  type Query {
    employee(id: ID!): Employee!
    employees: [Employee]
  }

  type Mutation {
    createEmployee(EmployeeInput: EmployeeInput): Employee!
    deleteEmployee(id: ID!): Boolean
    editEmployee(id: ID!, EmployeeInput: EmployeeInput): Employee!
  }
`
