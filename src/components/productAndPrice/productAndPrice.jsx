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
        />
        <PriceDescription info={props.urlphotos} />
      </div>
    </div>
  );
};

export default ProductAndPrice;
