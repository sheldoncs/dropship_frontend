import * as actionTypes from "./actions/actionTypes";

const initialState = {
  offer: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SELECTED_OFFER:
      return {
        ...state,
        offer: action.offer,
      };

    default:
      return state;
  }
};

export default reducer;
