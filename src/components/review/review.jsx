import React from "react";
import classes from "./Review.module.css";

const review = (props) => {
  let tempClasses = [classes.Review];
  if (props.slideDown) {
    tempClasses.push(classes.SlideDown);
    tempClasses.push("text-center");
  } else {
    tempClasses.push(classes.SlideUp);
    tempClasses.push("text-center");
  }

  return (
    <div className={tempClasses.join(" ")}>
      <div onClick={props.clicked} style={{ position: "relative" }}>
        <a href="#">
          <span>{props.title}</span>
        </a>
      </div>
    </div>
  );
};

export default review;
