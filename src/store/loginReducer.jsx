import * as actionTypes from "./actions/actionTypes";

const LOGIN_STATE = "LOGIN_STATE";

const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SOCKET_ID:
      state = { ...state, socketid: action.socketid };
      break;
    case actionTypes.SAVE_CLIENT_SOCKET_ID:
      state = { ...state, clisocketid: action.clisocketid };
      break;
    case actionTypes.SET_TOKEN:
      state = { ...state, token: action.token };
      break;
    case actionTypes.SAVE_USER:
      state = { ...state, token: action.user };
      break;
    case actionTypes.IS_REGISTERING:
      state = {
        ...state,
        isRegistering: action.isRegistering,
        facebook: action.facebookVisible,
        google: action.googleVisible,
      };
      break;
    case actionTypes.SAVE_CREDENTIALS:
      state = { ...state, credentials: action.credentials };
      break;
    case actionTypes.LOGIN_FORM_IS_VALID:
      state = { ...state, formIsValid: action.formIsValid };
      break;
    case actionTypes.LOGIN_AUTHENTICATED:
      state = {
        ...state,
        loginAuthenticated: action.loginAuthenticated,
        username: action.username,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(LOGIN_STATE)) || state;
      break;
  }
  sessionStorage.setItem(LOGIN_STATE, JSON.stringify(state));
  return state;
};

export default reducer;
