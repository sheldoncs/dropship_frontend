import React from "react";
import classes from "./NavigateBar.module.css";

const navigateBar = (props) => {
  
  return (
    <div>
      {props.submenu != null ? (
        <div className={classes.NavigateBar}>
          <div style={{ margin: "5px" }} className={classes.Category}>
            <a href="#"> {props.submenu.category}</a>
          </div>
          <div style={{ margin: "5px", fontSize: "20px", color: "#7e7f80" }}>
            {">"}
          </div>
          <div style={{ margin: "5px" }} className={classes.Item}>
            {props.submenu.item}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default navigateBar;
