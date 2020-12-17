import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let formatClasses = [classes.Button];
  if (props.whichButton == "AddToCart") {
  }
  return (
    <div>
      <button className={formatClasses.join(" ")}>{props.children}</button>
    </div>
  );
};

export default Button;
