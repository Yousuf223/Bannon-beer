import { EDIT_PROFILE, LIST_DATA, SIGNUP } from '../actions/actionType';
import {USER_LOGIN} from '../constants';
// import { SIGNUP } from '../actions/actionType';
const initialState = {
  users: [],
  isLoading: false,
  ListDataAction:[]
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
          users : payload
        }
        case SIGNUP:
          return {
            ...state,
            users:payload
          }
          case EDIT_PROFILE:
            return{
              ...state,
              users:payload
            }
            case LIST_DATA:
              return{
                ...state,
                ListDataAction:payload,
                isLoading:false
              }
    default:
      return state
  }
}

export default userReducer
