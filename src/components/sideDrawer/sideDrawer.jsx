import React from "react";
import classes from "./SideDrawer.module.css";
import SidebarButtons from "../../components/sidebarButtons/sidebarButtons";

const sideDrawer = (props) => {
  let formatClasses = [classes.SideDrawer, classes.Close];

  if (props.openDrawer) {
    formatClasses = [classes.SideDrawer, classes.Open];
  } else {
    formatClasses = [classes.SideDrawer, classes.Close];
  }
  return (
    <div onClick={props.clicked} className={formatClasses.join(" ")}>
      <SidebarButtons />
    </div>
  );
};

export default sideDrawer;
