import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AllCountries from './countries';

const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      allCountries: AllCountries,
    }),
    applyMiddleware(thunk, logger),
  );

  return store;
};

export default ConfigureStore;
