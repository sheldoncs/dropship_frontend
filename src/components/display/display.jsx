import React from "react";
import classes from "./Display.module.css";

const display = (props) => {
  let prices = props.prices;
  let items = null;
  let btnClasses = [];
  btnClasses.push("btn");
  btnClasses.push("btn-info");

  let lengths = "";
  if (props.items != null && props.prices != null) {
    for (let price in props.prices) {
      lengths = lengths + " " + props.prices[price].hairlength;
    }
    items = props.items.map((value, index) => {
      return (
        <div key={value.itemid} className={classes.griditem}>
          <div>
            <img src={value.photo} className={classes.ImgDimen} />
          </div>
          <div style={{ fontWeight: "bold" }}>{value.option}</div>
          <div style={{ fontWeight: "normal", fontSize: "16px" }}>
            Available in {lengths}
          </div>
          <div style={{ fontWeight: "normal", fontSize: "16px", color: "red" }}>
            FROM {props.prices[0].price} USD
          </div>
          <div>
            <button
              style={{ marginTop: "20px" }}
              className={btnClasses.join(" ")}
            >
              ORDER NOW
            </button>
          </div>
        </div>
      );
    });
  }
  //   props.items.map((value, index) => {});

  return <div className={classes.Display}>{items}</div>;
};

export default display;
