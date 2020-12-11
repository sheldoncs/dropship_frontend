import React from "react";
import classes from "./Counter.module.css";

const counter = (props) => {
  let leftClasses = [classes.LeftIncrement];
  leftClasses.push("text-center");
  let middleClasses = [classes.Increment];
  middleClasses.push("text-center");
  let rightClasses = [classes.RightIncrement];
  rightClasses.push("text-center");

  return (
    <div className={classes.Counter}>
      <div className="pt-1">Quantity:</div>
      <div
        style={{ marginLeft: "100px" }}
        onClick={props.lclicked}
        className={leftClasses.join(" ")}
      >
        -
      </div>
      <div className={middleClasses.join(" ")}>1</div>
      <div onClick={props.rclicked} className={rightClasses.join(" ")}>
        +
      </div>
    </div>
  );
};

export default counter;
