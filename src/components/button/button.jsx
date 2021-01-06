import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let formatClasses = [classes.Button];
  if (props.whichButton) {
    formatClasses.push("btn");
    if (props.children == "ADD TO CART") {
      formatClasses.push("btn-success");
    } else if (props.children == "BUY NOW") {
      formatClasses.push("btn-danger");
    } else if (props.children == "BOOK IT") {
      formatClasses.push("btn-primary");
    }
  }
  return (
    <div>
      <button
        onClick={() => props.whichButton(props.children.replace(/\s/g, ""))}
        className={formatClasses.join(" ")}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
