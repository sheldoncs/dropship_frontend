import React from "react";
import classes from "./Footer.module.css";
import Policies from "./policies/policies";
import FollowUs from "./followUs/followUs";
import ContactUs from "./contactUs/contactUs";

const footer = (props) => {
  return (
    <div className={classes.Footer}>
      <div className={classes.CenterElements}>
        <Policies />
        <FollowUs />
        <ContactUs />
      </div>
    </div>
  );
};

export default footer;
