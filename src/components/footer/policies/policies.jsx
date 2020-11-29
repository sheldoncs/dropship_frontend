import React from "react";
import classes from "./Policies.module.css";
import NavigationItem from "../../../components/footerNavigationItem/footerNavigationItem";

const policies = (props) => {
  return (
    <div className={classes.Policies}>
      <div style={{ fontWeight: "bold", paddingBottom: "20px" }}>POLICIES</div>
      <div>
        <NavigationItem link={"/" + "privacy"}>PRIVACY</NavigationItem>
      </div>
      <div>
        <NavigationItem link={"/" + "TERMS"}>TERMS</NavigationItem>
      </div>
      <div>
        <NavigationItem link={"/" + "refund"}>REFUND</NavigationItem>
      </div>
    </div>
  );
};

export default policies;
