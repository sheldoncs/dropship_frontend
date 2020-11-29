import React from "react";
import classes from "./Ribbon.module.css";
import LeftAudio from "../../assets/leftmic.png";
import RightAudio from "../../assets/rightmic.png";

const Ribbon = (props) => {
  let txtClass = [classes.DispText];
  txtClass.push("pt-2");
  txtClass.push("mt-2");
  return (
    <div className={classes.Ribbon}>
      <div className={classes.Contents}>
        {/* <div className={classes.LeftAudio}>
          <img src={LeftAudio} />
        </div> */}
        <div className={classes.DispText}>
          <div className="mt-1">{props.children}</div>
        </div>
        {/* <div className={classes.RightAudio}>
          <img src={RightAudio} />
        </div> */}
      </div>
    </div>
  );
};

export default Ribbon;
