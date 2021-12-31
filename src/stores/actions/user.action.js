import { getUser } from '../../api/fakeApiUser'
import {USER_LOGIN, USER_LOGOUT} from '../constants';
export const fetchUserRequest = () => {
  return {
    type: 'FETCH_USER_REQUEST'
  }
}

export const fetchUserSuccess = users => {
  return {
    type: 'FETCH_USER_SUCCESS',
    payload: users
  }
}

export const fetchUserFail = () => {
  return {
    type: 'FETCH_USER_FAILED'
  }
}

export const fetchDataUser = () => async dispatch => {
  try {
    dispatch(fetchUserRequest())
    const { data } = await getUser()
    dispatch(fetchUserSuccess(data))
  } catch (error) {
    dispatch(fetchUserFail())
  }
}

export function userLogin(token) {
  console.log(token,"***Yahaan bhi Token hai ****")
  return dispatch => {
    dispatch({type: USER_LOGIN, userData: {token}});
  };
}


export function userLogout() {
  return dispatch => {
    dispatch({type: USER_LOGOUT});
  };
}

