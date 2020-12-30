import * as actionTypes from "./actions/actionTypes";

const initialState = {
  credentials: { username: " ", password: " ", email: " " },
  formIsValid: false,
  loginAuthenticated: false,
  username: "",
  isRegistering: false,
  facebook: "visible",
  google: "visible",
  user: null,
  token: "",
  socketID: "",
  clientSocketID: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SOCKET_ID:
      return {
        ...state,
        socketid: action.socketid,
      };
    case actionTypes.SAVE_CLIENT_SOCKET_ID:
      return {
        ...state,
        clisocketid: action.clisocketid,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.SAVE_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.IS_REGISTERING:
      return {
        ...state,
        isRegistering: action.isRegistering,
        facebook: action.facebookVisible,
        google: action.googleVisible,
      };
    case actionTypes.SAVE_CREDENTIALS:
      return {
        ...state,
        credentials: action.credentials,
      };
    case actionTypes.LOGIN_FORM_IS_VALID:
      return { ...state, formIsValid: action.formIsValid };
    case actionTypes.LOGIN_AUTHENTICATED:
      return {
        ...state,
        loginAuthenticated: action.loginAuthenticated,
        username: action.username,
      };
    default:
      return state;
  }
};

export default reducer;
