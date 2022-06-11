import {createStore, applyMiddleware, combineReducers} from 'redux'
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {pReducer} from './reducers'

export const store = createStore(pReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
