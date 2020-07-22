import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { all } from 'redux-saga/effects'
import rootReducer from '../redux/reducers/entityReducer'
import Entity from '../others/utilities/entity'
import UserSagas from './reducers/entityUserSagas'


const saga = function* root() {
    yield all(Entity.mSagas);
};

export default (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware];

    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middleware)
    );
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    store.runSaga = () => {
        if (store.saga) return;
        store.saga = sagaMiddleware.run(saga);
    };

    store.stopSaga = async () => {
        if (!store.saga) return;
        store.dispatch(END);
        await store.saga.done;
        store.saga = null;
    };

    store.execSagaTasks = async (ctx, tasks) => {
        Entity.mContext = ctx.store;
        await store.runSaga();
        if (ctx.hasOwnProperty('query')) {
            const body = JSON.stringify(ctx.query);
            if (!body.includes('css') && !body.includes('chunk')) {
                tasks(store.dispatch);
            }
        } else {
            tasks(store.dispatch);
        }
        await store.stopSaga();
        if (!ctx.isServer) {
            store.runSaga();
        }
    };

    store.runSaga();

    return store;
};