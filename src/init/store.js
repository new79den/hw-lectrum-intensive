import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import createSagaMiddleware from 'redux-saga';

const dev = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = dev && devtools ? devtools : compose;

const middleware = [sagaMiddleware];

export default createStore(
    rootReducer, composeEnhancer(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);
