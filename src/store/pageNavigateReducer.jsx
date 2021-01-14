import * as actionTypes from "./actions/actionTypes";

const initialState = { pages: [{ page: "", path: "" }] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_PAGE:
      let tmpState = { ...state };
      tmpState.pages.push({ ...action.page });
      return {
        ...state,
        pages: tmpState.pages,
      };
    case actionTypes.REMOVE_PAGE:
      let remState = { ...state };
      remState.pages = remState.pages.filter(function (el) {
        return el.page != action.page;
      });
      return {
        ...state,
        pages: remState.pages,
      };
    default:
      return state;
  }
};

export default reducer;
