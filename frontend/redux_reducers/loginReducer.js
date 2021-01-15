import {TYPES} from '../redux_actions/types';
import {getData} from '../Utils/asyncStorage';

const initialState = {
  loginData: {
    name: '',
    googleId: '',
    invalidData: false,
  },
  isLogged: false,
};

const loginReducer = function (state = initialState, action) {
  switch (action.type) {
    case TYPES.loginExternal:
      return {
        ...state,
        loginData: action.loginData,
        isLogged: action.isLogged,
      };
    case TYPES.logout:
      return {
        ...state,
        loginData: action.loginData,
        isLogged: action.isLogged,
      };
    case TYPES.logincheck:
      return {
        ...state,
        isLogged: action.loginData,
      };
    default:
      return state;
  }
};

export default loginReducer;
