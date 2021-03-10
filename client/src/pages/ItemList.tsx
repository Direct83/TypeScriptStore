import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_ITEMS_GRAPH } from '../query/user';

interface ItemsType {
  id: number,
  name: string,
  price: number,
  img: string,
}

export default function ItemList() {
  const [getItems] = useMutation(GET_ITEMS_GRAPH);
  const [itemsState, setItemsState] = useState<ItemsType[]>([]);

  const testHandler = async () => {
    const { data: { getItems: { items } } }: any = await getItems({ variables: { page: 1, limit: 5 } })
    console.log(items);

    setItemsState(items)
  }

  console.log('response', itemsState)
  return (
    <>
      <h1>ItemList</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '900px', display: 'flex', flexDirection: 'row', flexWrap: "wrap" }}>
          {itemsState.map((e) => {
            return (
              <>
                <div key={e.id} style={{
                  marginLeft: '50px', width: '200px', marginBottom: '20px'
                }}>
                  <img src={e.img} style={{ width: '100px', height: '100px', marginBottom: '20px' }} />
                  <div>Название: {e.name}</div>
                  <div>Цена: {e.price}</div>
                  <button>Добавить в корзину</button>
                </div>
              </>
            )
          }
          )}

        </div>

      </div>
      <button onClick={testHandler} style={{
        position: 'relative',
        left: '50%',
        transform: 'translate(-50%, 0)',
      }}>download</button>

    </>
  );
}
