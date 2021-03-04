import {buildSchema} from 'graphql'
import {UserModel, UserModelType} from '../models/user.model.js';

export const schema = buildSchema(`
  type User {
  name: String,
  password: String,
  email: String,
  id: String
  }
  input UserInput {
    name: String!,
    password: String!,
    email: String,
    id: String
  }
  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }
  type Mutation {
    createUser(input: UserInput): User
  }
`
)  
