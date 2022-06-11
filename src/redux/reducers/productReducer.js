import {
  FETCH_PRODUCTS,
  STORE_ALL_PRODUCTS,
  ERROR_FETCHING_PRODUCTS,
} from '../actionTypes/productActionsTypes'

const initialState = {
  products: [],
  isLoading: false,
  error: null,
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      }
    case STORE_ALL_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.data,
      }
    case ERROR_FETCHING_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: [],
        error: action.message,
      }
    default:
      return state
  }
}

export default productReducer
