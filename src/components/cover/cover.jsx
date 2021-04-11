import React from "react";
import classes from "./Cover.module.css";

const cover = (props) => {
  return (
    <div>
      <div onClick={props.clicked} className={classes.Cover}></div>
    </div>
  );
};

export default cover;
