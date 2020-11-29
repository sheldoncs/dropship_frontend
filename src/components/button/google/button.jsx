import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  let btnClasses = [classes.Button];
  btnClasses.push("btn");
  btnClasses.push("btn-primary");

  let creds = null;
  let intializeValue = " ";

  creds = (
    <button className={btnClasses.join(" ")} onClick={props.clicked}>
      {props.children}
    </button>
  );

  return <div> {creds}</div>;
};

export default button;
