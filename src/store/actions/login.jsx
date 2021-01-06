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
export const saveOffer = (offer) => {
  return { type: actionTypes.SAVE_SELECTED_OFFER, offer: offer };
};
export const saveOrder = (order) => {
  return { type: actionTypes.SAVE_ORDER, order: order };
};
export const saveQuantity = (quantity) => {
  return { type: actionTypes.SAVE_QUANTITY, quantity: quantity };
};
export const saveCategory = (category) => {
  return { type: actionTypes.SAVE_CATEGORY, category: category };
};
export const saveSocketID = (socketid) => {
  return { type: actionTypes.SAVE_SOCKET_ID, socketid: socketid };
};
export const saveClientSocketID = (socketid) => {
  return { type: actionTypes.SAVE_CLIENT_SOCKET_ID, clisocketid: socketid };
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
