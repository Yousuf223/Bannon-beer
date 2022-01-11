import { getApi, getUser, postApi ,putApi, saveApi} from '../../api/fakeApiUser'
import {USER_LOGIN, USER_LOGOUT} from '../constants';
import base_url from '../../api/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIST_DATA, SIGNUP, } from './actionType';
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

export function userLogin(data1,id) {
  return async dispatch => {
    const {data}  = await postApi(`${base_url}api/login`, data1)
    dispatch({type: USER_LOGIN, payload:data?.data});
    return data;
  };
}

export function SignUpAction(objData) {
  return async dispatch => {
    const data  = await postApi(`${base_url}api/signup`, objData)
    return data;
  };
}

export function EditProfileAction(EditData) {
  return async dispatch => {
    const { data }  = await saveApi(`${base_url}api/users/1`, EditData,await AsyncStorage.getItem("token"));
    dispatch({type: USER_LOGIN, payload:data?.data});
    console.log(data,"RETURN DAAATA")
    return data;
  };
}

export function ListDataAction(listData) {
  return async dispatch => {
    const data  = await getApi(`${base_url}api/products`, listData)
    dispatch({type: LIST_DATA, payload:data?.data})
    return data;
  };
}

export function userLogout() {
  return dispatch => {
    dispatch({type: USER_LOGOUT});
  };
}

