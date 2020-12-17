import React from "react";
import classes from "./ButtonVariance.module.css";

const buttonVariance = (props) => {
  let storeClasses = [classes.Button];
  storeClasses.push("btn");
  storeClasses.push("btn-dark");
  return (
    <div>
      <div
        style={{ fontSize: "12px", margin: "2px" }}
        className={storeClasses.join(" ")}
        onClick={props.clicked}
        onClick={() => props.clicked(props.keyValue)}
      >
        {props.children}
      </div>
    </div>
  );
};

export default buttonVariance;
