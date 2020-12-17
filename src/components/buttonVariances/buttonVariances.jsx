import React from "react";
import classes from "./ButtonVariances.module.css";
import ButtonVariance from "./buttonVariance/buttonVariance";

const buttonVariances = (props) => {
  let variances = null;
  if (props.priceOptions != null) {
    variances = props.priceOptions.map((values, index) => {
      return (
        <div className={classes.Container} key={values.id}>
          <ButtonVariance
            keyValue={values.id}
            clicked={(val) => props.clicked(val)}
          >
            {values.hairlength}
          </ButtonVariance>
        </div>
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
