import React from "react";
import classes from "./ButtonVariances.module.css";
import ButtonVariance from "./buttonVariance/buttonVariance";

const buttonVariances = (props) => {
  let variances = null;
  if (props.priceOptions != null) {
    variances = props.priceOptions.map((values, index) => {
      console.log(values);
      return (
        <div className={classes.Button} key={values.id}>
          <ButtonVariance>{values.hairlength}</ButtonVariance>
        </div>
      );
    });
  }
  return <div className={classes.Button}>{variances}</div>;
};

export default buttonVariances;
