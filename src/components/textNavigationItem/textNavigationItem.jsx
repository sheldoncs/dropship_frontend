import React from "react";
import classes from "./TextNavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  return (
    <li className={classes.FooterNavigationItem}>
      <NavLink
        exact
        onClick={props.clicked}
        activeClassName={classes.active}
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
