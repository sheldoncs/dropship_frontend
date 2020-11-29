import React from "react";
import classes from "./ContactUs.module.css";

const contactUs = (props) => {
  return (
    <div className={classes.ContactUs}>
      <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>
        CONTACT US
      </div>
      <div>luxifiedhairnlash@gmail.com</div>
      <div>(246) 847-3460</div>
    </div>
  );
};

export default contactUs;
