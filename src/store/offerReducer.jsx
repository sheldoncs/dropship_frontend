import * as actionTypes from "./actions/actionTypes";

const OFFER_STATE = "OFFER_STATE";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_SELECTED_OFFER:
      state = { ...state, offer: action.offer };
      break;

    default:
      state = JSON.parse(sessionStorage.getItem(OFFER_STATE)) || state;
      break;
  }
  sessionStorage.setItem(OFFER_STATE, JSON.stringify(state));

  return state;
};

export default reducer;
