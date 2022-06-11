import {
  ADD_ITEM_CART,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  INCREMENT_CART_ITEM,
  REMOVE_ITEM_CART,
} from './productActionsTypes'

export const addItemToCart = data => ({
  type: ADD_ITEM_CART,
  data: {...data, quantity: 1},
})

export const incrementCartItem = id => ({
  type: INCREMENT_CART_ITEM,
  id: id,
})

export const decrementCartItem = id => ({
  type: DECREMENT_CART_ITEM,
  id: id,
})

export const removeItemToCart = id => ({
  type: REMOVE_ITEM_CART,
  id: id,
})

export const clearCart = () => ({
  type: CLEAR_CART,
})
