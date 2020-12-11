import React from "react";
import classes from "./Classifications.module.css";
import Button from "../../../button/button";
import ButtonVariances from "../../../buttonVariances/buttonVariances";
import Counter from "../../../counter/counter";
import Input from "../../../input/input";

const SensorSize = (props) => {
  // console.log("selectoptions", props.hairType.elementconfig.selectoptions);
  let category = "";
  let StoreClasses = [classes.Type];
  StoreClasses.push("text-center");
  if (props.category != null) {
    category = props.category.category;
  }
  return (
    <div className={classes.Classification}>
      <ButtonVariances priceOptions={props.priceOptions} />
      <div
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
        className="ml-4 pt-5"
      >
        <div style={{ paddingTop: "6px" }}>Type:</div>
        <div className={StoreClasses.join(" ")}>{category}</div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row", width: "100%" }}
        className="ml-4 pt-5"
      >
        <div style={{ paddingTop: "6px" }}>Hair Type:</div>
        <div className={classes.Select}>
          <Input
            elementType={props.hairType.elementtype}
            elementconfig={props.hairType.elementconfig}
            elementName={props.hairType.elementname}
          />
        </div>
      </div>
      <Counter lclicked={props.lclicked} rclicked={props.rclicked} />
    </div>
  );
};

export default SensorSize;
