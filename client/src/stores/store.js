import { createStore } from 'redux';
import rootReducer from '../reducers';

//console.log(initialState);

export default function configureStore(initialState) {
    const store = createStore(rootReducer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    //console.log('state is: ' + store.getState());

    return store;
}