import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let formatClasses = [classes.Button];
  if (props.whichButton) {
    formatClasses.push("btn");
    if (props.children == "Add To Cart") {
      formatClasses.push("btn-success");
    } else if (props.children == "Buy Now") {
      formatClasses.push("btn-danger");
    } else if (props.children == "Book It") {
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
