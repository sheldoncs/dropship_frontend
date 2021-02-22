import * as actionTypes from "./actions/actionTypes";
const initialState = {};

const ORDER_CATEGORY = "ORDER_CATEGORY";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_CATEGORY:
      state = { ...state, category: action.category };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(ORDER_CATEGORY)) || state;
      break;
  }
  sessionStorage.setItem(ORDER_CATEGORY, JSON.stringify(state));

  return state;
};

export default reducer;
