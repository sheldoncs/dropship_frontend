import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let formatClasses = [classes.Button];
  formatClasses.push(classes.Properties);
  if (props.whichButton) {
    // if (props.children == "ADD TO CART") {
    //   formatClasses.push(classes.Properties);
    // } else if (props.children == "BUY NOW") {
    //   formatClasses.push(classes.Properties);
    // } else if (props.children == "BOOK IT") {
    //   formatClasses.push(classes.Properties);
    // }
  }
  return (
    <div>
      <div
        onClick={() => props.whichButton(props.children.replace(/\s/g, ""))}
        className={formatClasses.join(" ")}
      >
        <div className="text-center pt-2">{props.children}</div>
      </div>
    </div>
  );
};

export default Button;
