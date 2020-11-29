import React from "react";
import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  let targetClasses = [classes.ErrorMessage];
  if (props.show) {
    if (props.showError) {
      targetClasses.push(classes.Open);
    }
  } else {
    targetClasses.push(classes.Close);
  }
  return (
    <div onClick={props.clicked} className={targetClasses.join(" ")}>
      <div className="text-center pt-2">{props.children}</div>
    </div>
  );
};

export default ErrorMessage;
