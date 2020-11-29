import React from "react";
import classes from "./FollowUs.module.css";
import facebookLogo from "../../../assets/social/facebook.png";
import pinterest from "../../../assets/social/pinterest.png";
import instagram from "../../../assets/social/instagram.png";

const followUs = (props) => {
  return (
    <div className={classes.FollowUs}>
      <div>
        <span style={{ fontWeight: "bold" }}>FOLLOW US</span>
      </div>
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexDirection: "row",
          width: "200px",
        }}
      >
        {/* style={{ paddingLeft: "20px;" }} */}
        <div>
          <a href="">
            <img src={facebookLogo} />
          </a>
        </div>
        <div>
          <a href="">
            <img src={pinterest} />
          </a>
        </div>
        <div>
          <a href="">
            <img src={instagram} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default followUs;
