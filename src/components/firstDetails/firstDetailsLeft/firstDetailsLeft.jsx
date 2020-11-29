import React from "react";
import classes from "./FirstDetailsLeft.module.css";
import WifiLogo from "../../../assets/wifilogo.png";
import NightVision from "../../../assets/nightvision.png";
import Waterproof from "../../../assets/waterproof.png";

const FirstDetailsLeft = (props) => {
  return (
    <div className={classes.FirstDetailsLeft}>
      <div style={{ width: "140px" }} className="ml-5">
        <div className={classes.leftItems}>
          <img src={WifiLogo} />
        </div>
        <div className={classes.leftItemsText}>2.4 FB WiFi</div>
      </div>
      <div style={{ width: "140px" }} className="ml-5">
        <div className={classes.leftItems}>
          <img src={NightVision} />
        </div>
        <div className={classes.leftItemsText}>Night Vision</div>
      </div>
      <div style={{ width: "140px" }} className="ml-5">
        <div className={classes.leftItems}>
          <img src={Waterproof} />
        </div>
        <div className={classes.leftItemsText}>Waterproof</div>
      </div>
    </div>
  );
};

export default FirstDetailsLeft;
