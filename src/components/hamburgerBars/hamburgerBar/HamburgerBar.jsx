import React from "react";
import classes from "./HamburgerBar.module.css";

const hamburgerBar = (props) => {
  let formatClass = [classes.MenuBar];
  formatClass.push("d-block");
  formatClass.push("ml-5");

  return (
    <div className="d-block mb-2 ml-5">
      <div className={classes.HamburgerBar}></div>
    </div>
  );
};

export default hamburgerBar;
