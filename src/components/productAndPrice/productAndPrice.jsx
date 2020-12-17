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
          photoclicked={(val) => props.photoclicked(val)}
        />
        <PriceDescription
          info={props.urlphotos}
          offer={props.offer}
          priceOptions={props.priceOptions}
          category={props.category}
          hairType={props.hairType}
          priceId={props.priceId}
          hairlength={props.hairlength}
          clicked={(val) => props.clicked(val)}
        />
      </div>
    </div>
  );
};

export default ProductAndPrice;
