import React from "react";
import classes from "./PriceDescription.module.css";

import Classifications from "./classifications/classifications";
import PlugType from "./plugType/plugType";

const PriceDecription = (props) => {
  console.log("itemname", props.itemname);
  return (
    <div className={classes.PriceDescription}>
      <Classifications
        isOffer={props.isOffer}
        category={props.category}
        categoryinfo={props.categoryinfo}
        info={props.info}
        priceOptions={props.priceOptions}
        hairType={props.hairType}
        offer={props.offer}
        priceId={props.priceId}
        hairlength={props.hairlength}
        category={props.category}
        price={props.priceOptions}
        itemname={props.itemname}
        count={props.count}
        changed={props.changed}
        lclicked={(val) => props.lclicked(val)}
        rclicked={(val) => props.rclicked(val)}
        clicked={(val) => props.clicked(val)}
        whichButton={(val) => props.whichButton(val)}
        clickReview={props.clickReview}
      />
    </div>
  );
};

export default PriceDecription;
