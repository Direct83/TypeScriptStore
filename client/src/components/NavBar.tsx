import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/auth/actions';
import { RootState } from '../redux/store'
// import { useQuery } from '@apollo/client';
// import { SIGNOUT_GRAPH } from '../query/user';

export default function Navbar() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const logout = async () => {
    await fetch('auth/signout');
    dispatch(logOutUser());
    // App. logout().then(() => client.resetStore());
  };
  // useEffect(() => {
  //   const {data, client} = useQuery(SIGNOUT_GRAPH)
  // }, [])

  return (
    <nav className="nav-item">
      <Link className="navWords" to="/">Home</Link>
      <Link className="navWords" to="/first">FirstPage</Link>
      <Link className="navWords" to="/second">SecondPage</Link>
      {!isAuth && <Link className="navWords" to="/auth">Login</Link>}
      {isAuth && <Link className="navWords" to="/login" onClick={logout}>logOut</Link>}
    </nav>
  );
}
