import * as actionTypes from "./actions/actionTypes";

const initialState = {
  order: null,
  category: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ORDER:
      return {
        ...state,
        offer: action.order,
      };
    case actionTypes.SAVE_CATEGORY:
      return {
        ...state,
        offer: action.category,
      };
    default:
      return state;
  }
};

export default reducer;
