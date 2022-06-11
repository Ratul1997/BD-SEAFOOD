import {CLEAR_USER_INFO, STORE_USER_INFO} from '../actionTypes/userActionTypes'

const initialState = {
  userInfo: {},
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...action.data,
        },
      }
    case CLEAR_USER_INFO:
      return {
        userInfo: {},
      }
    default:
      return state
  }
}

export default userReducer
