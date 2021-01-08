import React from "react";
import classes from "./OrderLabels.module.css";

const OrderLabels = (props) => {
  return (
    <div className={classes.OrderLabels}>
      <div className={classes.Labels}>PRODUCT</div>
      <div className={classes.Labels}>STYLE</div>
      <div className={classes.Labels}>HAIR TYPE</div>
      <div className={classes.Labels}>HAIR LENGTH</div>
      <div className={classes.Labels}>QUANTITY</div>
      <div className={classes.Labels}>UNIT PRICE</div>
      <div className={classes.Labels}>TOTAL</div>
    </div>
  );
};

export default OrderLabels;
