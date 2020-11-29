import React from "react";
import classes from "./PriceDescription.module.css";

import SensorSize from "./sensorSize/sensorSize";
import PlugType from "./plugType/plugType";

const PriceDecription = (props) => {
  return (
    <div className={classes.PriceDescription}>
      <SensorSize info={props.info} />
      <PlugType info={props.info} />
    </div>
  );
};

export default PriceDecription;
