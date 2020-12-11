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
      />
    </div>
  );
};

export default PriceDecription;
