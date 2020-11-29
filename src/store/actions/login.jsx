import * as actionTypes from "./actionTypes";

export const saveMenu = (navmenu) => {
  return { type: actionTypes.SAVE_MENU, menu: navmenu };
};
export const setToken = (token) => {
  return { type: actionTypes.SET_TOKEN, token: token };
};
export const saveUser = (user) => {
  return { type: actionTypes.SAVE_USER, user: user };
};
export const saveCredentials = (saveCredentials) => {
  return { type: actionTypes.SAVE_CREDENTIALS, credentials: saveCredentials };
};
export const loginFormIsValid = (isValid) => {
  return {
    type: actionTypes.LOGIN_FORM_IS_VALID,
    formIsValid: isValid,
  };
};
export const formIsRegistering = (isRegistering, fbVisible, glVisible) => {
  return {
    type: actionTypes.IS_REGISTERING,
    isRegistering: isRegistering,
    facebookVisible: fbVisible,
    googleVisible: glVisible,
  };
};
export const loginAuthenticated = (isAuth, username) => {
  return {
    type: actionTypes.LOGIN_AUTHENTICATED,
    loginAuthenticated: isAuth,
    username: username,
  };
};
