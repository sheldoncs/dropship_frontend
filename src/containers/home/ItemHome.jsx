import React, { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { categoryQuery } from "../../Query/Query";

const ItemHome = () => {
  const [data, sendRequest] = useHttp();
  useEffect(() => {
    console.log(data);
  }, [data]);
};
const menuList = useCallBack(() => {
  sendRequest(categoryQuery, null);
});
export default ItemHome;
