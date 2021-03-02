import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthPage() {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {isAuth && <Redirect to="/" />}
      { !isAuth && (
        <div className="authPage">
          <Link to="/signin">Login</Link>
          <Link to="/signup">Registration</Link>
        </div>
      )}
    </>
  );
}
