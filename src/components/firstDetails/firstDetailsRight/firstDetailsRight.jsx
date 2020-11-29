import React from "react";
import classes from "./FirstDetailsRight.module.css";
import MetalCasing from "../../../assets/metalcasing.png";
import gif from "../../../assets/gif/anim_vid.gif";

const firstDetailsRight = (props) => {
  let targetClass = [classes.PurchaseButton];
  targetClass.push("btn-primary");
  return (
    <div className={classes.FirstDetailsRight}>
      <div className={classes.rightItemsHeader}>FULL METAL CASING</div>
      <div className={classes.rightItemsText}>
        The body is made of high strength metal and very durable. This also
        allows the Wifi Camera to attain IP66 level protection.
      </div>
      <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
        <div className={targetClass.join(" ")}>
          <div style={{ width: "120px", margin: "auto", paddingTop: "10px" }}>
            PURCHASE NOW
          </div>
        </div>
        <div>
          <img src={gif} className={classes.gif} />
        </div>
      </div>
      <div className={classes.rightItems}>
        <img style={{ width: "550px", height: "465px" }} src={MetalCasing} />
      </div>
    </div>
  );
};

export default firstDetailsRight;
