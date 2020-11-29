import React from "react";
import classes from "./HeaderDescription.module.css";

const HeaderDescription = (props) => {
  return (
    <div className={classes.HeaderDescription}>
      <div className={classes.Titles}>
        <div className={classes.TitleSpacers}>
          <span>PTZ WIFI CAMERA</span>
        </div>
        <div className={classes.TitleSpacers}>
          <span>{props.info.sensorSize.size1.plug.labelUS.price} USD</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderDescription;
