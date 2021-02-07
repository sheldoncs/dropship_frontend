import React from "react";
import classes from "./Product.module.css";
import SmallPhotos from "./smallPhotos/smallPhotos";
import ExpandedPhoto from "./expandedPhoto/expandedPhoto";

const Product = (props) => {
  return (
    <div className={classes.Product}>
      <ExpandedPhoto
        urlphoto={props.urlphotos}
        offer={props.offer}
        order={props.order}
      />
      {props.showSubPhotos == true ? (
        <SmallPhotos
          urlphotos={props.urlphotos}
          isOffer={props.isOffer}
          offer={props.offer}
          order={props.order}
          showSubPhotos={props.showSubPhotos}
          clicked={(val, photo) => props.photoclicked(val, photo)}
        />
      ) : null}
    </div>
  );
};

export default Product;
