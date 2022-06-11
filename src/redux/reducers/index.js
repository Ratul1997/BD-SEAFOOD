import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import {persistStore, persistReducer} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userReducer from './userReducer'
import uploadedProductReducer from './uploadedProductReducer'
import cartReducer from './cartReducer'
import productReducer from './productReducer'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

const allReducers = combineReducers({
  userReducer,
  uploadedProductReducer,
  cartReducer,
  productReducer,
})
export const pReducer = persistReducer(persistConfig, allReducers)
