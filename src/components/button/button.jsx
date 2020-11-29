import React from "react";
import { isClassExpression } from "typescript";
import classes from "./Button.module.css";

const Button = (props) => {
  let formatClasses = [classes.Button];

  return (
    <div>
      <button className={formatClasses.join(" ")}>{props.children}</button>
    </div>
  );
};

export default Button;
