import React from "react";
import HamburgerBar from "./hamburgerBar/HamburgerBar";
import classes from "./HamburgerBars.module.css";

const hamburgerBars = (props) => {
  let formatClasses = [classes.HamburgerBars];
  formatClasses.push("ml-1");
  formatClasses.push("pt-4");

  return (
    <React.Fragment>
      <div onClick={props.clicked} className={formatClasses.join(" ")}>
        <HamburgerBar props={props.clicked} />
        <HamburgerBar props={props.clicked} />
        <HamburgerBar props={props.clicked} />
      </div>
    </React.Fragment>
  );
};

export default hamburgerBars;
