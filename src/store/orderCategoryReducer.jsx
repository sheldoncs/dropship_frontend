import * as actionTypes from "./actions/actionTypes";

const initialState = {
  orders: [],
  category: null,
  quantity: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ORDER:
      let tempState = { ...state };
      tempState.orders.map((data, index) => {
        if (data.itemid == action.order[0].itemid) {
          tempState.orders[index].quantity = action.order[0].quantity;
        }
      });

      return {
        ...state,
        orders: tempState.orders,
      };
    case actionTypes.SAVE_ORDER:
      let orderState = { ...state };

      orderState.orders.push({ ...action.order });

      return {
        ...state,
        orders: orderState.orders,
      };
    case actionTypes.SAVE_CATEGORY:
      return {
        ...state,
        category: action.category,
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
