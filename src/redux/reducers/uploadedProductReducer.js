import {findInArray} from '../../helpers/utils'
import {
  ADD_ITEM_PRODUCT_UPLOAD,
  REMOVE_ITEM_PRODUCT_UPLOAD,
} from '../actionTypes/productActionsTypes'

const initialState = {
  products: [],
}
const insertAItem = (prevState, newItem) => {
  prevState.unshift(newItem)
  return [...prevState]
}

const removeAItem = (prevState, id) => {
  const index = findInArray(prevState, id, 'id')
  if (index > -1) {
    prevState.splice(index, 1)
  }
  return [...prevState]
}
const uploadedProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_PRODUCT_UPLOAD:
      return {...state, products: insertAItem(state.products, action.data)}
    case REMOVE_ITEM_PRODUCT_UPLOAD:
      return {...state, products: removeAItem(state.products, action.id)}
    default:
      return state
  }
}

export default uploadedProductReducer
