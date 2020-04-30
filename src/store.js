import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'; // нужен чтобы отслеживать изменения store в консоли браузера

import rootReducers from './reducers';

const store = createStore(rootReducers, applyMiddleware(logger));

export default store;