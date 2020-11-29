import React from "react";
import SidebarButton from "./sidebarButton/sidebarButton";
import classes from "./SidebarButtons.module.css";

const sidebarButtons = (props) => {
  return (
    <div className={classes.SidebarButtons}>
      <SidebarButton>
        <div style={{ marginLeft: "50px" }} className="pt-1">
          Home
        </div>
      </SidebarButton>
      <SidebarButton>
        <div style={{ marginLeft: "50px" }} className="pt-1">
          Features
        </div>
      </SidebarButton>
      <SidebarButton>
        <div style={{ marginLeft: "50px" }} className="pt-1">
          Contact
        </div>
      </SidebarButton>
    </div>
  );
};

export default sidebarButtons;
