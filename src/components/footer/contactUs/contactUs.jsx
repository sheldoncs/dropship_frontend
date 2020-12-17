import React from "react";
import classes from "./ContactUs.module.css";

const contactUs = (props) => {
  return (
    <div className={classes.ContactUs}>
      <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
        CONTACT US
      </div>
      <div>admin@opitin.com</div>
      <div>(246) 233-3829</div>
    </div>
  );
};

export default contactUs;
