import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type itemObj {
  id: String,
  name: String,
  price: String,
  img: String,
}
type getItemsType {
  message: String,
  items: [itemObj],
}
input getItemsInput {
  page: Int,
  limit: Int,
}
type signUpType {
  userId: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  message: String,
}
input signUpInput {
  userId: String,
  userName: String,
  name: String,
  password: String,
  email: String,
  message: String,
}
type signInType {
  userId: String,
  name: String,
  password: String,
  email: String
  message: String,
  userName: String,
}
input signInInput {
  userId: String,
  name: String,
  password: String,
  email: String,
  message: String,
  userName: String,
}
input signOut {
  message: String
}
type Message {
  message:String,
  userId: String,
  userName: String,
}
type Query {
  check: Message
}
type Mutation {
  signUp(input: signUpInput): signUpType
  signIn(input: signInInput ): signInType
  getItems(input: getItemsInput ): getItemsType
  signOut(input: signOut): signInType
}
`;
