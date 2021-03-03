import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authFetchSaga } from '../redux/auth/actions';

const SignIn = () => {
  const { isAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: '',
    password: '',
  });

  const inputHundler = (event: React.SyntheticEvent<EventTarget>
  ) => {
    const { name, value }: any = event.target;
    setAuthData((previousAuthData) => ({
      ...previousAuthData,
      [name]: value,
    }));
  };
  const loginHandler = async () => {
    const path = 'signin';
    dispatch(authFetchSaga(authData, path));
  };

  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth
        && (
          <div className="login">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputName1" className="form-label">
                  name
                  <input type="text" onChange={inputHundler} name="name" className="form-control" id="exampleInputName1" />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  password
                  <input type="password" onChange={inputHundler} name="password" className="form-control" id="exampleInputPassword1" />
                </label>
              </div>
              <button type="button" className="btn btn-primary" onClick={loginHandler}>Submit</button>
            </form>
          </div>
        )}
    </>
  );
};

export default SignIn;
