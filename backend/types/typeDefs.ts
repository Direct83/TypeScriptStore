import { ApolloServer, gql }  from 'apollo-server-express';

export const typeDefs = gql`
type signUpType {
  userId: String,
  name: String,
  password: String,
  email: String,
  message: String,
}
input signUpInput {
  userId: String,
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
type signOutType {
  message:String
}
type checkType {
  message:String
}
type Query {
  signOut: signOutType
  check: String
}
type Mutation {
  signUp(input: signUpInput): signUpType
  signIn(input: signInInput ): signInType
}
`;  // const typeDefs = loadSchemaSync(path.join(__dirname, './schema.graphql'));
