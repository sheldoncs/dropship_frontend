import React from "react";
import classes from "./Intro.module.css";
import intro from "../../assets/intro.png";

const Intro = (props) => {
  let targetClass = [classes.PurchaseButton];
  targetClass.push("btn-primary");
  return (
    <div className={classes.Intro}>
      <div className={classes.ItemText}>
        <div className={classes.ItemTextHeader}>PTV WIFI CAMERA</div>
        <div className={classes.ItemTextDetails}>
          <p>
            Equiped with built in Microphone and speaker. At any time you can
            remotely view your pet dog, family, employee, etc and talk to them.
          </p>
        </div>
        <div
          style={{
            width: "270px",
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            marginTop: "70px",
          }}
        >
          <div className={targetClass.join(" ")}>
            <div
              onClick={props.clicked}
              className="pt-2"
              style={{ margin: "auto", width: "120px" }}
            >
              <span>PURCHASE NOW</span>
            </div>
          </div>
          {/* <div className={classes.PriceDisplay}>
            <div
              style={{
                width: "80px",
                margin: "auto",
                paddingTop: "7px",
              }}
            >
              34.99 USD
            </div>
          </div> */}
        </div>
      </div>
      <div className={classes.Item}>
        <img src={intro} />
      </div>
    </div>
  );
};

export default Intro;
