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
      <div style={{ position: "relative" }}>
        <a href="#">{props.children}</a>
        {/* <button style={{ marginTop: "-40px" }}>Help</button> */}
      </div>
    </div>
  );
};

export default review;
