import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import ItemList from './pages/ItemList';
import BasketPage from './pages/Basket';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { signInUser } from './redux/auth/actions';
import { useQuery } from '@apollo/client';
import { CHECK_GRAPH } from './query/user'

export default function App() {
  // const stateCheck = useSelector((state) => state);
  // console.log('reduxApp', stateCheck);
  const dispatch = useDispatch();
  const { data } = useQuery(CHECK_GRAPH)
  useEffect(() => {
    console.log('check app', data)
    if (data?.check?.userId && data?.check?.userName) {
      dispatch(signInUser(data.check.userId, data.check.userName))
    }
  }, [data])
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/itemList" exact component={ItemList} />
        <Route path="/basket" exact component={BasketPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}
