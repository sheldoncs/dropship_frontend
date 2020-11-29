import React from "react";
import classes from "./Product.module.css";
import SmallPhotos from "./smallPhotos/smallPhotos";
import ExpandedPhoto from "./expandedPhoto/expandedPhoto";

const Product = (props) => {
  return (
    <div className={classes.Product}>
      <ExpandedPhoto urlphoto={props.urlphotos} />
      <SmallPhotos
        urlphotos={props.urlphotos}
        clicked={(val) => props.clicked(val)}
      />
    </div>
  );
};

export default Product;
