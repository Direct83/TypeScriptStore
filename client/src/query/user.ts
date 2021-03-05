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
    }
  }
`;
