import {buildSchema} from 'graphql'

export const schema = buildSchema(`
  type signUpType {
    userId: String,
    name: String,
    message: String,
    password: String,
    email: String,
  }
  input signUpInput {
    name: String, 
    password: String, 
    email: String,
    userId: String,
  }
  type signInType {
    message: String,
    userId: String,
    userName: String,
    password: String,
  }
  input signInInput {
    name: String, 
    password: String, 
    email: String
  }
  type Query {
    signout: String
    check: String
  }
  type Mutation {
    signUp(input: signUpInput): signUpType
    signIn(input: signInInput ): signInType
  }
`
)  

