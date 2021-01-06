import React from "react";
import classes from "./ProductAndPrice.module.css";
import Product from "./product/product";
import PriceDescription from "./priceDescription/priceDescription";
import HeaderDescription from "../../components/productAndPrice/priceDescription/headerDescription/headerDescription";

const ProductAndPrice = (props) => {
  return (
    <div>
      <div className={classes.ProductAndPrice}>
        <Product
          urlphotos={props.urlphotos}
          clicked={(val) => props.clicked(val)}
          offer={props.offer}
          isOffer={props.isOffer}
          showSubPhotos={props.showSubPhotos}
          photoclicked={(val, photo) => props.photoclicked(val, photo)}
        />
        <PriceDescription
          info={props.urlphotos}
          offer={props.offer}
          priceOptions={props.priceOptions}
          category={props.category}
          hairType={props.hairType}
          priceId={props.priceId}
          hairlength={props.hairlength}
          count={props.count}
          changed={props.selectChanged}
          clicked={(val) => props.clicked(val)}
          lclicked={(val) => props.lclicked(val)}
          rclicked={(val) => props.rclicked(val)}
          whichButton={(val) => props.whichButton(val)}
        />
      </div>
    </div>
  );
};

export default ProductAndPrice;
