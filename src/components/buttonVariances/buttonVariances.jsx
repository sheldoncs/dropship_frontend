import React from "react";
import classes from "./ButtonVariances.module.css";
import ButtonVariance from "./buttonVariance/buttonVariance";

const buttonVariances = (props) => {
  let variances = null;
  if (props.priceOptions != null) {
    variances = props.priceOptions.map((values, index) => {
      return (
        // <div>
        <div className={classes.Container} key={values.id}>
          <ButtonVariance>{values.hairlength}</ButtonVariance>
        </div>
        // <div className={classes.Container}></div>
        // </div>
      );
    });
  }
  return (
    <React.Fragment>
      <div className={classes.Button}>{variances}</div>
      
    </React.Fragment>
  );
};

export default buttonVariances;
