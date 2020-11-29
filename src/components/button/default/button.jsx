import React from "react";
import classes from "./button.module.css";

// import Button from "./index";

const button = (props) => {
  let creds = null;
  let intializeValue = " ";
  let buttonClasses = [classes.Button];
  let formisvalid = false;
  // buttonClasses.push("btn");

  if (props.formisvalid) {
    formisvalid = props.formisvalid;
  }

  if (!props.newAccount) {
    buttonClasses.push("btn");
    buttonClasses.push("btn-info");
  } else {
    buttonClasses.push("btn");
    buttonClasses.push("btn-success");
    formisvalid = true;
  }

  creds = (
    <button
      disabled={!formisvalid}
      onClick={() => props.clicked}
      className={buttonClasses.join(" ")}
    >
      {props.children}
    </button>
  );

  return <div> {creds}</div>;
};

export default button;
