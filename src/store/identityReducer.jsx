import * as actionTypes from "./actions/actionTypes";
const initialState = {};

const LAST_IDENTITY = "LAST_IDENTITY";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LAST_IDENTITY:
      state = { ...state, lastidentityid: action.lastidentityid };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(LAST_IDENTITY)) || state;
      break;
  }
  sessionStorage.setItem(LAST_IDENTITY, JSON.stringify(state));
  return state;
};

export default reducer;
