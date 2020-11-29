import React from "react";
import classes from "./FirstDetails.module.css";
import FirstDetailsLeft from "./firstDetailsLeft/firstDetailsLeft";
import FirstDetailsRight from "./firstDetailsRight/firstDetailsRight";

const FirstDetails = (props) => {
  return (
    <div className={classes.FirstDetails}>
      <FirstDetailsLeft />
      <FirstDetailsRight />
    </div>
  );
};

export default FirstDetails;
