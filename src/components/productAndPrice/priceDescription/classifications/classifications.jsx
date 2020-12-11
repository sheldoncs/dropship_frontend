import React from "react";
import classes from "./Classifications.module.css";
import Button from "../../../button/button";
import ButtonVariances from "../../../buttonVariances/buttonVariances";
const SensorSize = (props) => {
  return (
    <div className={classes.Classification}>
      <ButtonVariances priceOptions={props.priceOptions} />
    </div>
  );
};

export default SensorSize;
