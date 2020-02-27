import { createStore, combineReducers } from 'redux';

import userReducer from './reducers/userReducer'
import groupReducer from './reducers/groupReducer';





const store = createStore(combineReducers({
    user:userReducer,
    group:groupReducer
}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;