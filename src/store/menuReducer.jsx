import * as actionTypes from "./actions/actionTypes";

const MENU_STATE = "MENU_STATE";
const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_MENU:
      state = {
        ...state,
        menu: action.menu,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(MENU_STATE)) || state;
      break;
  }
  sessionStorage.setItem(MENU_STATE, JSON.stringify(state));
  return state;
};

export default reducer;
