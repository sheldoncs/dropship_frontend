import React, { useState, useCallback } from "react";
import fetch from "../fetchservice/fetchservice";

const useHttp = () => {
  abortController = new AbortController();
  signal = this.abortController.signal;
  const [data, setData] = useState(null);

  const sendRequest = useCallback((query, variables) => {
    fetch(
      {
        query: query,
        variables,
      },
      { signal: this.signal }
    ).then((res) => {
      setData(res.data);
    });
  });
  return { data: data, result: sendRequest };
};

export default useHttp;
