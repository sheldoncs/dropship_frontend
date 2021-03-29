import * as actionTypes from "./actions/actionTypes";

const QUANTITY_STATE = "QUANTITY_STATE";
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_QUANTITY:
      let tempState = { ...state };
      if (!state.quantity) {
        state = { ...state, quantity: action.quantity };
      } else {
        tempState.quantity =
          parseInt(state.quantity, 10) + parseInt(action.quantity, 10);
        state = { ...state, quantity: tempState.quantity };
      }

      break;
    case actionTypes.REMOVE_QUANTITY:
      let tmpState = { ...state };
      if (state.quantity) {
        if (parseInt(state.quantity, 10) >= parseInt(action.quantity, 10)) {
          tmpState.quantity =
            parseInt(state.quantity, 10) - parseInt(action.quantity, 10);
        }
      }
      state = { ...state, quantity: tmpState.quantity };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(QUANTITY_STATE)) || state;

      break;
  }

  sessionStorage.setItem(QUANTITY_STATE, JSON.stringify(state));
  return state;
};

export default reducer;
