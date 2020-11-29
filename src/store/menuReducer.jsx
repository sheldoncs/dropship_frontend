import * as actionTypes from "./actions/actionTypes";

const initialState = {
  menu: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_MENU:
      return {
        ...state,
        menu: action.menu,
      };

    default:
      return state;
  }
};

export default reducer;
