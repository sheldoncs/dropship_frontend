import React from "react";
import classes from "./ButtonVariance.module.css";

const buttonVariance = (props) => {
  let storeClasses = [classes.Button];
  //   storeClass.push("btn");
  storeClasses.push("btn-info");
  return (
    <div>
      <div
        style={{ fontSize: "12px", width: "55px", margin: "2px" }}
        className="btn btn-secondary"
        onClick={props.clicked}
      >
        {props.children}
      </div>
    </div>
  );
};

export default buttonVariance;
