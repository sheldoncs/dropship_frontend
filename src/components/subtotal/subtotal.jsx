import React from "react";
import classes from "./Subtotal.module.css";

const subtotal = (props) => {
  let offerClass = [];
  if (props.showOffer) {
    offerClass.push(classes.ShowOffer);
  } else {
    offerClass.push(classes.HideOffer);
  }
  return (
    <div className={classes.Container}>
      <div className={classes.testFlex}></div>
      <div className={classes.Calculation}>
        <div className={classes.Subtotal}>
          <div className={classes.Label}>
            <span>Sub Total:</span>
          </div>
          <div className={classes.PriceLabel}>
            {Number(props.subtotal).toFixed(2)}
          </div>
        </div>
        <div className={offerClass}>
          <div className={classes.Label}>
            <span>{props.offerType}:</span>
          </div>
          <div className={classes.PriceLabel}>
            <span>{props.offerTotal.toFixed(2)}</span>
          </div>
        </div>
        {/* <div className={classes.Divider}></div> */}
        <div className={classes.Subtotal}>
          <div className={classes.Label}>
            <span>Total :</span>
          </div>
          <div className={classes.PriceLabel}>
            {Number(props.grandTotal).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default subtotal;
