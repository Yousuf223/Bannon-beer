import { getApi, getUser, postApi ,putApi, saveApi} from '../../api/fakeApiUser'
import {USER_LOGIN, USER_LOGOUT} from '../constants';
import base_url from '../../api/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIST_DATA, SIGNUP,FEATURED_PRODUCTS, My_Purchases,PUSH_NOTIFICATION,CHANGE_PASSWORD, FEEDBACK, ABOUT, QRCODE} from './actionType';
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


export function ChangePasswordAction(ChangeData) {
  return async dispatch => {
    const { data }  = await postApi(`${base_url}api/changepassword`, ChangeData,await AsyncStorage.getItem("token"));
    dispatch({type: CHANGE_PASSWORD, payload:data?.data});
    return data;
  };
}


export function QRCodeAction(QRData) {
  return async dispatch => {
    const { data }  = await postApi(`${base_url}api/orders`, QRData,await AsyncStorage.getItem("token"));
    dispatch({type: QRCODE, payload:data?.data});
    console.log("qweertyyuuioooo---------------uuuuuuuu",data)
    return data;
  };
}

export function FeedbackAction(FeedbackData) {
  return async dispatch => {
    const { data }  = await postApi(`${base_url}api/feedbacks`, FeedbackData,await AsyncStorage.getItem("token"));
    dispatch({type: FEEDBACK, payload:data?.data});
    return data;
  };
}

export function ListDataAction() {
  return async dispatch => {
    const data  = await getApi(`${base_url}api/products`, '', await AsyncStorage.getItem("token"))
    dispatch({type: LIST_DATA, payload:data?.data})
    // console.log('dddddddhhhhhhhh',data)
    return data;
  };
}

export function FeaturedProducts() {
  // console.log("${base_url}api/products`", `${base_url}api/products?featured=1`)
  return async dispatch => {
    const data  = await getApi(`${base_url}api/products?featured=1`, '', await AsyncStorage.getItem("token"))
    dispatch({type: FEATURED_PRODUCTS, payload:data?.data})
   // console.log('dddddddhhhhhhhh',data)
    return data;
  };
}

export function MyPurchases() {
  return async dispatch => {
    const data  = await getApi(`${base_url}api/orders`, '', await AsyncStorage.getItem("token"))
    dispatch({type: My_Purchases, payload:data?.data})
    return data;
  };
}
export function NotificationAction() {
  return async dispatch => {
    const data  = await getApi(`${base_url}api/notifications`, '', await AsyncStorage.getItem("token"))
    dispatch({type: PUSH_NOTIFICATION, payload:data?.data})
    return data;
  };
}

export function AboutAction() {
  return async dispatch => {
    const data  = await getApi(`${base_url}api/about`, '', await AsyncStorage.getItem("token"))
    dispatch({type: ABOUT, payload:data?.data})
    console.log('dddddddhhhhhhhh',data)
    return data;
  };
}

export function userLogout() {
  return dispatch => {
    dispatch({type: USER_LOGOUT});
  };
}

