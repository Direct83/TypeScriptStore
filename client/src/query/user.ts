import { gql } from '@apollo/client';

export const GET_ITEMS_GRAPH: any = gql`
mutation ($page: Int $limit: Int){
  getItems(
    input: { page: $page, limit: $limit}
  ) {
    items { 
      id
      name
      price
      img 
    } 
    itemsLength
    message
  }
}
`;
export const SIGNUP_GRAPH: any = gql`
  mutation ($name: String $password: String $email: String){
    signUp(
      input: { name: $name,password: $password, email: $email }
    ) {
      userName
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
    userName,
    userId,
    password,
    email,
    message
  }
}
`;
export const CHECK_GRAPH: any = gql`
query {
  check {
    message, userId, userName
  }
}
`;
export const SIGNOUT_GRAPH: any = gql`
mutation($message: String) {
  signOut(input:{message: $message}) {
    message
  }
}
`;

