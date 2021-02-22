import * as actionTypes from "./actions/actionTypes";

const PAGE_STATE = "PAGE_STATE";
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PAGE:
      state = { ...state, pages: [] };
      state.pages.push({ ...action.page });
      break;
    case actionTypes.REMOVE_PAGE:
      let remState = { ...state };
      remState.pages = remState.pages.filter(function (el) {
        return el.page != action.page;
      });
      state = {
        ...state,
        pages: remState.pages,
      };
      break;
    default:
      state = JSON.parse(sessionStorage.getItem(PAGE_STATE)) || state;
      break;
  }
  sessionStorage.setItem(PAGE_STATE, JSON.stringify(state));
  return state;
};

export default reducer;
