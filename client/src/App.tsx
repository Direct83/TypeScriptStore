import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthPage from './pages/AuthPage';
import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { checkAuth, signInUser } from './redux/auth/actions';
import { useQuery } from '@apollo/client';
import { CHECK_GRAPH } from './query/user'

function App() {
  // const stateCheck = useSelector((state) => state);
  // console.log(stateCheck);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  const {data} = useQuery(CHECK_GRAPH)
  useEffect(() => {
    dispatch(signInUser(data?.check?.userId, data?.check?.userName))
  }, [])
  
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/first" exact component={FirstPage} />
        <Route path="/second" exact component={SecondPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
