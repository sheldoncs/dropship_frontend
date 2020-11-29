import React from "react";
import classes from "./button.module.css";

// import Button from "./index";

const button = (props) => {
  let creds = null;
  let buttonClasses = [classes.Button];

  // buttonClasses.push("btn");
  // buttonClasses.push("btn-success");
  buttonClasses.push("pt-2");
  creds = (
    <div onClick={props.clicked} className={buttonClasses.join(" ")}>
      {props.children}
    </div>
  );

  return <div> {creds}</div>;
};

export default button;
