import React from "react";
import Signup from "../../assets/loginsignup.png";
import Shopping from "../../assets/cart.png";
import classes from "./Settings.module.css";
import logo from "../../assets/wizzy_wig.png";
import NavigationItem from "../../components/footerNavigationItem/footerNavigationItem";

const Settings = (props) => {
  return (
    <div className={classes.Settings}>
      <div className={classes.Luxified}>
        <img src={logo} />
      </div>
      <div className={classes.Icons}>
        <NavigationItem className={classes.AlignSetting} link="/login">
          <div style={{ paddingLeft: "5px" }}>
            <img src={Signup} />
          </div>

          <div className={classes.textFont}>
            <span className="pt-3">{props.welcome}</span>
          </div>
        </NavigationItem>
      </div>
      <div className={classes.Icons}>
        <div className={classes.Order}>
          <div className="text-center pt-1">
            <span>0</span>
          </div>
        </div>
        <img src={Shopping} />
      </div>
    </div>
  );
};

export default Settings;
