import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchSaga } from '../redux/auth/actions';
import { RootState } from '../redux/store'

import { useQuery, gql, useMutation } from '@apollo/client';
// import { SIGNUP_GRAPH } from '../query/user';

const SIGNUP_GRAPH: any = gql`
mutation ($name: String, $email: String, $password: String){
  signUp(input: { name: $name, email: $email, password: $password }) {
    name,
    userId,
    password,
    email,
  }
}
`;

const SIGNOUT_GRAPH: any = gql`
query {
  signout {
    message
  }
}
`;
interface AuthDataType {
  name: string,
  email: string,
  password: string,
}

export default function SignUp() {
  // const { loading, error, data } = useQuery(SIGNOUT_GRAPH);
  const [signUp, { loading, error, data }] = useMutation(SIGNUP_GRAPH);
  // console.log('data', data?.signOut?.message)
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState<AuthDataType>({
    name: '',
    email: '',
    password: '',
  });
  const inputHundler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthData((previousAuthData) => ({
      ...previousAuthData,
      [name]: value,
    }));
  };
  const signUpHandler = async () => {
    const path = 'signup';
    signUp({variables: authData}).then(console.log)
    console.log('authData:%s, data:%s', authData, data)
    // dispatch(authFetchSaga(authData, path));
  };

  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth && (
        <div className="registration">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                loginName
                <input type="text" onChange={inputHundler} name="name" className="form-control" id="exampleInputName1" />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                email
                <input type="email" onChange={inputHundler} name="email" className="form-control" id="exampleInputEmail1" />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                password
                <input type="password" onChange={inputHundler} name="password" className="form-control" id="exampleInputPassword1" />
              </label>
            </div>
            <button type="button" className="btn btn-primary" onClick={signUpHandler}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
