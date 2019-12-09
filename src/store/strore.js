import {createStore ,combineReducers,applyMiddleware}  from 'redux'
import thunk from 'redux-thunk'

export default configureStore =() => {
    const store = createStore(combineReducers({

    }),applyMiddleware())
    return store
}

