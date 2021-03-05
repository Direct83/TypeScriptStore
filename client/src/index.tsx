import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/store';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Test from './components/Test';

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  cache: new InMemoryCache(),
})
// client
//   .query({
//     query: gql`
//     query {
//       signout {
//         message
//       }
//     }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <Test />
      <App />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
