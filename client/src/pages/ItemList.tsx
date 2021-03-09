import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
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

  const testHandler = async()=>{
    const {data:{getItems:{items}}}:any = await getItems({ variables: {page: 3, limit: 7} })
    console.log(items);
    
    setItemsState(items)
  }
  
  console.log('response', itemsState)
  return (
    <>
      <h1>ItemList</h1>
      {itemsState.map((e)=> 
        <div>
          <img src={e.img} style={{width:'100px', height:'100px', marginBottom: '20px'}} />
          {e.name}
          {e.price}
        </div>
      )}
      <button onClick={testHandler}>download</button>

    </>
  );
}
