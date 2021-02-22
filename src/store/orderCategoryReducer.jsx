import * as actionTypes from "./actions/actionTypes";
import { read_cookie, bake_cookie } from "sfcookies";

const ORDER_STATE = "ORDER_STATE";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ORDER:
      let tempState = { ...state };
      tempState.orders.map((data, index) => {
        if (data.itemid == action.order[0].itemid) {
          tempState.orders[index].quantity = action.order[0].quantity;
        }
      });
      state = { ...state, orders: tempState.orders };
      break;

    case actionTypes.SAVE_ORDER:
      let orderState = {};

      if (state.orders) {
        if (state.orders.length > 0) {
          orderState = { ...state };
        }
      } else {
        orderState = { ...state, orders: [] };
      }
      orderState.orders.push({ ...action.order });
      state = { ...orderState };

      break;

    case actionTypes.SAVE_QUANTITY:
      state = { ...state, quantity: action.quantity };
      break;

    default:
      state = JSON.parse(sessionStorage.getItem(ORDER_STATE)) || state;
      break;
  }

  sessionStorage.setItem(ORDER_STATE, JSON.stringify(state));

  return state;
};

export default reducer;
