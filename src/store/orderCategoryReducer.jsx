import * as actionTypes from "./actions/actionTypes";

const initialState = {
  orders: [],
  category: null,
  quantity: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ORDER:
      let tempState = { ...state };
      tempState.orders.push(action.order);
      return {
        ...state,
        orders: tempState.orders,
      };
    case actionTypes.SAVE_CATEGORY:
      return {
        ...state,
        offer: action.category,
      };
    case actionTypes.SAVE_QUANTITY:
      return {
        ...state,
        quantity: action.quantity,
      };
    default:
      return state;
  }
};

export default reducer;
