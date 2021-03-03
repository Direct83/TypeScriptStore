import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spiner from '../components/spinner/spinner';
import { loadServerDataSaga } from '../redux/content/actions';

export default function HomePage() {
  const { isAuth } = useSelector((state: any) => state.auth);
  const { serverData, loading } = useSelector((state: any) => state.content);
  const dispatch = useDispatch();
  const loadServerText = () => {
    dispatch(loadServerDataSaga(333));
  };
  return (
    <>
      <h1>HomePage</h1>
      {!isAuth
        ? <div>Контент доступен только авторизованным пользователям</div>
        : (
          <>
            <button type="button" style={{ marginBottom: '20px' }} onClick={loadServerText}>Загрузить</button>
            {loading ? <Spiner /> : <h2>{serverData}</h2>}
          </>
        )}
    </>
  );
}
