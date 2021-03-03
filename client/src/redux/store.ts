import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import userReducer from './auth/reducer';
import contentReducer from './content/reducer';
import rootSagas from './rootSagas';

const saga = createSagaMiddleware();
const rootReducer = combineReducers({
  auth: userReducer,
  content: contentReducer,
})
export type RootState = ReturnType<typeof rootReducer>
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    saga,
  )),
);
saga.run(rootSagas);

export default store;
