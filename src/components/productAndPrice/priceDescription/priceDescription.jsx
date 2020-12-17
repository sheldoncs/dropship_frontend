import React from "react";
import classes from "./PriceDescription.module.css";

import Classifications from "./classifications/classifications";
import PlugType from "./plugType/plugType";

const PriceDecription = (props) => {
  return (
    <div className={classes.PriceDescription}>
      <Classifications
        category={props.category}
        info={props.info}
        priceOptions={props.priceOptions}
        hairType={props.hairType}
        offer={props.offer}
        priceId={props.priceId}
        hairlength={props.hairlength}
        category={props.category}
        price={props.priceOptions}
        count={props.count}
        lclicked={(val) => props.lclicked(val)}
        rclicked={(val) => props.rclicked(val)}
        clicked={(val) => props.clicked(val)}
        whichButton={(val) => props.whichButton(val)}
      />
    </div>
  );
};

export default PriceDecription;
