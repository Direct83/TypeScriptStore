import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'
import { useMutation } from '@apollo/client';
import { GET_BASKET_GRAPH } from '../query/user';
export default function BasketPage() {
  const [getBasket] = useMutation(GET_BASKET_GRAPH);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { userId } = useSelector((state: RootState) => state.auth)
  const [basketState, setBasketState] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    (async () => {
      if (userId) {
        const { data: { getBasket: { basket } } }: any = await getBasket({ variables: { userId } })
        setBasketState(basket)
        if (basket.length > 0) {
          setTotal(basket?.map((el: any) => +el.price)?.reduce((a: any, b: any) => a + b))
        }
      }
    })()
  }, [])
  console.log('total', total)
  return (
    <>
      <h1>BasketPage</h1>
      {isAuth ?
        (
          <>
            <h2>Общая сумма заказа: {total}</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ol>
                {basketState.map((el: any) => {
                  return (
                    <li key={el.id} style={{ marginBottom: '20px' }}>
                      <div>Название: {el.name}</div>
                      <div>Цена: {el.price}</div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </>
        ) : <div>Контент доступен только авторизованным пользователям</div>
      }
    </>
  );
}
