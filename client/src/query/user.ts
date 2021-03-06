import { gql } from '@apollo/client';

export const SIGNUP_GRAPH: any = gql`
  mutation {
    signUp(
      input: { name: "Serg8", email: "serge@cloude.com", password: "1234" }
    ) {
      name
      userId
      password
      email
      message
    }
  }
`;

export const SIGNIN_GRAPH: any = gql`
mutation ($name: String $password: String){
  signIn(input: { name: $name, password: $password }) {
    name,
    userId,
    password,
    email,
    userName,
    message
  }
}
`;

export const CHECK_GRAPH: any = gql`
query {
  check {
    message
  }
}
`;

export const SIGNOUT_GRAPH: any = gql`
query {
  signout {
    message
  }
}
`;

