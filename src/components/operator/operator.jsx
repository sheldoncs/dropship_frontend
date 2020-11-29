import React from "react";
import classes from "./Operator.module.css";

const Operator = (props) => {
  let tempClasses = [classes.Operator];
  //   tempClasses.push("btn");
  tempClasses.push("btn-dark");
  return (
    <div>
      <button
        style={{
          borderRadius: "50%",
          border: "0px",
          width: "30px",
          height: "30px",
          marginLeft: "5px",
          marginRight: "5px",
        }}
        className={tempClasses.join("")}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Operator;
