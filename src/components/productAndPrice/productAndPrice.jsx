import React from "react";
import classes from "./ProductAndPrice.module.css";
import Product from "./product/product";
import PriceDescription from "./priceDescription/priceDescription";
import HeaderDescription from "../../components/productAndPrice/priceDescription/headerDescription/headerDescription";

const ProductAndPrice = (props) => {
  return (
    <div>
      <HeaderDescription info={props.info} />
      <div className={classes.ProductAndPrice}>
        <Product
          urlphotos={props.urlphotos}
          clicked={(val) => props.clicked(val)}
        />
        <PriceDescription info={props.urlphotos} />
      </div>
    </div>
  );
};

export default ProductAndPrice;
