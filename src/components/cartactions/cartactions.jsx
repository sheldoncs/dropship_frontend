import React from "react";
import classes from "./CartActions.module.css";
import PayPal from "../../assets/paypal.png";

const subtotal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.ButtonSummary}>
        <div onClick={props.clickShowSummary} className="text-center pt-2">
          SHOW SUMMARY
        </div>
      </div>
      <div className={classes.Container}>
        <div className={classes.FlexActions}>
          {/*
           */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default subtotal;
