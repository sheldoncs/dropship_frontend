import React from "react";
import classes from "./message.module.css";

const message = (props) => {
  return (
    <div onClick={props.clicked} className={classes.Message}>
      {props.children}
    </div>
  );
};

export default message;
