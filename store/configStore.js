import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {applyMiddleware, compose, createStore} from 'redux';
import {multiClientMiddleware} from 'redux-axios-middleware';
import {MICROBILT_KEY} from '../constants/constants';
import {persistReducer, persistStore} from 'redux-persist';
import reducer from './reducer';

const clients = {
  default: {
    client: axios.create({
      baseURL: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api',
      responseType: 'json',
    }),
  },
  contextWeb: {
    client: axios.create({
      baseURL: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api',
      responseType: 'json',
    }),
  },
  zenserp: {
    client: axios.create({
      baseURL: 'https://app.zenserp.com/api/v2',
      responseType: 'json',
    }),
  },

  jailBase: {
    client: axios.create({
      baseURL: 'https://jailbase-jailbase.p.rapidapi.com',
      responseType: 'json',
    }),
  },
  criminalCheck: {
    client: axios.create({
      baseURL: 'https://completecriminalchecks.com',
      responseType: 'json',
    }),
  },
  tinEye: {
    client: axios.create({
      baseURL: 'https://api.tineye.com',
      responseType: 'json',
    }),
  },
  theNewsApi: {
    client: axios.create({
      baseURL: 'https://api.thenewsapi.com/v1/news',
      responseType: 'json',
    }),
  },
  courtListener: {
    client: axios.create({
      baseURL: 'https://www.courtlistener.com/api/rest/v3',
      responseType: 'json',
    }),
  },
  timeTags: {
    client: axios.create({
      baseURL: 'https://api.nytimes.com/svc/semantic/v2/concept/suggest',
      responseType: 'json',
    }),
  },
  microBilt: {
    client: axios.create({
      baseURL: 'https://apitest.microbilt.com',
      responseType: 'json',

      headers: {
        Authorization: MICROBILT_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }),
  },
};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducer);
export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(multiClientMiddleware(clients))),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
