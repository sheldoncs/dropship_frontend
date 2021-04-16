import { useState, useCallback, useReducer } from "react";
import fetch from "../fetchservice/fetchservice";

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "MENU":
      return [
        ...curHttpState,
        { handlerType: action.type, data: action.responseData },
      ];

    case "OFFER":
      return [
        ...curHttpState,
        { handlerType: action.type, data: action.responseData },
      ];
    case "ERROR":
      return { loading: false, error: action.errorMessage, data: null };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not get here");
  }
};
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, []);

  const sendRequest = useCallback((query, variables, type) => {
    if (variables != null) {
      fetch({
        query: query,
        variables,
      }).then((res) => {
        dispatchHttp({ type: type, responseData: res.data });
      });
    } else {
      fetch({
        query: query,
      }).then((res) => {
        dispatchHttp({ type: type, responseData: res.data });
      });
    }
  }, []);

  return { handler: httpState, sendRequest: sendRequest };
};

export default useHttp;
