import PromiseModules from '../../helpers/PromiseModules'
import {
  ADD_ITEM_PRODUCT_UPLOAD,
  ERROR_FETCHING_PRODUCTS,
  FETCH_PRODUCTS,
  REMOVE_ITEM_PRODUCT_UPLOAD,
  STORE_ALL_PRODUCTS,
} from '../actionTypes/productActionsTypes'

export const addNewItemToUpload = data => ({
  type: ADD_ITEM_PRODUCT_UPLOAD,
  data: data,
})

export const removeItemToUpload = id => ({
  type: REMOVE_ITEM_PRODUCT_UPLOAD,
  id: id,
})

export const storeAllProducts = data => ({
  type: STORE_ALL_PRODUCTS,
  data: data,
})

export const fetchProducts = () => ({
  type: FETCH_PRODUCTS,
})

export const onErrorFetchProducts = message => ({
  type: ERROR_FETCHING_PRODUCTS,
  message: message,
})

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      dispatch(fetchProducts())
      const response = await PromiseModules.getDataByCollection(
        'Products',
        null,
        null,
        'order',
      )
      let ar = [...response]
      dispatch(storeAllProducts(ar))
    } catch (error) {
      console.log(error)
      dispatch(onErrorFetchProducts('Something Went Wrong!'))
    }
  }
}
