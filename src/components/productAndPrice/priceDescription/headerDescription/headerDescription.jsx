import React from "react";
import classes from "./HeaderDescription.module.css";
import Deals from "../../../../assets/deals.png";

const HeaderDescription = (props) => {
  let price = null;

  if (props.price != null) {
    props.price.map((value, index) => {
      if (value.id == props.priceId) {
        price = value.price;
      } else {
        if (value.id == 1) {
          price = value.price;
        }
      }
    });
  }
  let discountClass = [classes.Discount];
  // discountClass.push("text-center");
  discountClass.push("pt-2");

  return (
    <div className={classes.HeaderDescription}>
      <div className={classes.Title}>
        {props.offer != null ? (
          props.offer.offertype == "PERCENT" ? (
            <React.Fragment>
              <div className={classes.OfferLabel}>
                <div className="text-center pt-4">-{props.offer.amount}%</div>
              </div>
              <div>{props.offer.condition}</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={classes.OfferLabel}>
                <div className="text-center pt-4">-${props.offer.amount}</div>
              </div>
              <div>{props.offer.condition}</div>
            </React.Fragment>
          )
        ) : null}
      </div>
      <div className={classes.Price}>
        <div>{price != null ? price.toFixed(2) : null}</div>
      </div>
    </div>
  );
};

export default HeaderDescription;
