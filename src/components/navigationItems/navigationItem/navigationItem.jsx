import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  let tempClasses = [classes.NavigationItem];
  tempClasses.push("pt-1");
  return (
    // <li className={classes.NavigationItem}>
    //   {/* <NavLink
    //     exact
    //     onClick={props.clicked}
    //     activeClassName={classes.active}
    //     to={props.link}
    //   >
    //     {props.children}
    //   </NavLink> */}

    // </li>

    <div
      onClick={props.clicked}
      className={classes.NavigationItem}
      onClick={props.clicked}
    >
      <a href="#">{props.children}</a>
    </div>
  );
};

export default navigationItem;
