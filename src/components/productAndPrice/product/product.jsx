import React from "react";
import classes from "./Product.module.css";
import SmallPhotos from "./smallPhotos/smallPhotos";
import ExpandedPhoto from "./expandedPhoto/expandedPhoto";

const Product = (props) => {
  return (
    <div className={classes.Product}>
      <ExpandedPhoto urlphoto={props.urlphotos} offer={props.offer} />
      {props.showSubPhotos == true ? (
        <SmallPhotos
          urlphotos={props.urlphotos}
          isOffer={props.isOffer}
          offer={props.offer}
          showSubPhotos={props.showSubPhotos}
          clicked={(val) => props.clicked(val)}
        />
      ) : null}
    </div>
  );
};

export default Product;
