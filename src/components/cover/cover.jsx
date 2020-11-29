import React, { Component } from "react";
import classes from "./Cover.module.css";

const cover = (props) => {
  return props.show == true ? (
    <div onClick={props.clicked} className={classes.Cover}></div>
  ) : null;
};

export default cover;
