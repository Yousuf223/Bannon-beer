import { EDIT_PROFILE, LIST_DATA, SIGNUP, FEATURED_PRODUCTS, My_Purchases, PUSH_NOTIFICATION, CHANGE_PASSWORD, FEEDBACK, ABOUT, QRCODE, SOCIAL_LOGIN, TOGGLE_VALUE,FORGOT_PASSWORD } from '../actions/actionType';
// import { AboutAction, userLogout } from '../actions/user.action';
import { USER_LOGIN,USER_LOGOUT } from '../constants';
// import { SIGNUP } from '../actions/actionType';
const initialState = {
  users: null,
  isLoading: false,
  ListDataAction: [],
  FeaturedProducts: [],
  MyPurchases: [],
  NotificationAction: [],
  AboutAction:[]
}

export const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        isLoading: true
      }

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        users: payload,
        isLoading: false
      }
    case 'FETCH_USER_FAILED':
      return {
        ...state,
        isLoading: false
      }

    case USER_LOGIN:
      return {
        ...state,
        users: payload
      }
      case USER_LOGOUT:
        return {
          ...state,
          users: null
        }
    case SIGNUP:
      return {
        ...state,
        users: payload
      }
      case SOCIAL_LOGIN:
        return{
          ...state,
          users:payload
        }
    case CHANGE_PASSWORD:
      return {
        ...state,
        // users: payload
      }
      case FORGOT_PASSWORD:
        return {
          ...state,
          // users: payload
        }
      case QRCODE:
        return {
          ...state,
          // users:payload
        }
    case FEEDBACK:
      return {
        ...state,
        // users: payload
      }
      case TOGGLE_VALUE:
        return {
          ...state,
          users:payload
        }
    case EDIT_PROFILE:
      return {
        ...state,
        users: payload
      }
    case LIST_DATA:
      return {
        ...state,
        ListDataAction: payload,
        isLoading: false
      }
    case FEATURED_PRODUCTS:
      return {
        ...state,
        FeaturedProducts: payload,
        isLoading: false
      }
    case My_Purchases:
      return {
        ...state,
        MyPurchases: payload,
        isLoading: false
      }
    case PUSH_NOTIFICATION:
      return {
        ...state,
        NotificationAction: payload,
        isLoading: false
      }
      case ABOUT:{
        return{
          ...state,
          AboutAction:payload,
          isLoading:false
        }
      }
    default:
      return state
  }
}

export default userReducer
