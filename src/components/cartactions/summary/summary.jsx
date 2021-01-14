import React from "react";
import classes from "./Summary.module.css";
import PayPal from "../../../assets/paypal.png";

const summary = (props) => {
  let offerClass = [];

  if (props.showOffer) {
    offerClass.push(classes.ShowOffer);
  } else {
    offerClass.push(classes.HideOffer);
  }

  let saveClasses = [classes.Summary, classes.Close];
  if (props.openSummary == true) {
    saveClasses = [classes.Summary, classes.Open];
  }

  return (
    <div className={saveClasses.join(" ")}>
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

        <div className={classes.Subtotal}>
          <div className={classes.Label}>
            <span>Total :</span>
          </div>
          <div className={classes.PriceLabel}>
            {Number(props.grandTotal).toFixed(2)}
          </div>
        </div>

        <div className={classes.ContinueShopping}>
          <div className="text-center">CONTINUE SHOPPING</div>
        </div>
        <div className={classes.Checkout}>
          <div className="text-center">CHECKOUT</div>
        </div>
        <div className={classes.PayPal}>
          <div className="text-center">
            <img src={PayPal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default summary;
