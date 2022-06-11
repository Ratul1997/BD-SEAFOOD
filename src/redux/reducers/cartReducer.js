import {findInArray} from '../../helpers/utils'
import {
  ADD_ITEM_CART,
  ADD_ITEM_PRODUCT_UPLOAD,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_ITEM_CART,
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

const incrementDecrementItem = (prevState, id, type = 'INCREMENT') => {
  const index = findInArray(prevState, id, 'id')
  if (index > -1) {
    prevState[index] = {
      ...prevState[index],
      quantity:
        type === 'INCREMENT'
          ? prevState[index].quantity + 1
          : prevState[index].quantity - 1,
    }
  }
  return [...prevState]
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_CART:
      return {...state, products: insertAItem(state.products, action.data)}
    case REMOVE_ITEM_CART:
      return {...state, products: removeAItem(state.products, action.id)}
    case INCREMENT_CART_ITEM:
      return {
        ...state,
        products: incrementDecrementItem(
          state.products,
          action.id,
          'INCREMENT',
        ),
      }
    case DECREMENT_CART_ITEM:
      return {
        ...state,
        products: incrementDecrementItem(
          state.products,
          action.id,
          'DECREMENT',
        ),
      }
    case CLEAR_CART:
      return {
        products: [],
      }
    default:
      return state
  }
}

export default cartReducer
