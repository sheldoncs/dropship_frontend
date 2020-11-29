import React from "react";
import classes from "./SidebarButton.module.css";

const sidebarButton = (props) => {
  return (
    <div className={classes.SidebarButton}>
      <a href="#">{props.children}</a>
    </div>
  );
};

export default sidebarButton;
