import {CLEAR_USER_INFO, STORE_USER_INFO} from '../actionTypes/userActionTypes'

export const storeUserInfos = data => ({
  type: STORE_USER_INFO,
  data: data,
})

export const clearUserInfos = () => ({
  type: CLEAR_USER_INFO,
})
