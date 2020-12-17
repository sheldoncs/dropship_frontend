import React from "react";
import classes from "./HeaderDescription.module.css";

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
        <div>
          <span>Flash Deals</span>
        </div>
        {props.offer != null ? (
          <div className={discountClass.join(" ")}>
            <div>
              {props.offer.offer} {props.offer.condition.toUpperCase()}
            </div>
          </div>
        ) : null}
      </div>
      <div className={classes.Price}>
        <div className={classes.UnitCost}>Unit Price</div>
        <div>{price != null ? price.toFixed(2) : null}</div>
      </div>
      {/* <div className={classes.Titles}> */}
      {/* <div className={classes.TitleSpacers}>
          {props.category != null ? <span>{props.category.item}</span> : null}
        </div> */}
    </div>
  );
};

export default HeaderDescription;
