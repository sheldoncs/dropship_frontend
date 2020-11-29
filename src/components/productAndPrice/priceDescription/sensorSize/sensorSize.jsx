import React from "react";
import classes from "./SensorSize.module.css";
import Button from "../../../button/button";

const SensorSize = (props) => {
  return (
    <div className={classes.SensorSize}>
      <div className={classes.Center}>
        <div className={classes.Label}>SENSOR CARD SIZE:</div>
        <div className={classes.OrderButtons}>
          <Button className={classes.Button}>
            {props.info.cameraInfo.sensorSize.size1.size}
          </Button>
          <Button className={classes.Button}>
            {props.info.cameraInfo.sensorSize.size2.size}
          </Button>
        </div>
        <div className={classes.OrderButtons}>
          <Button>{props.info.cameraInfo.sensorSize.size3.size}</Button>
          <Button>{props.info.cameraInfo.sensorSize.size4.size}</Button>
        </div>
      </div>
    </div>
  );
};

export default SensorSize;
