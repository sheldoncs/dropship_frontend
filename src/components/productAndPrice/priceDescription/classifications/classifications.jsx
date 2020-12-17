import React from "react";
import classes from "./Classifications.module.css";
import Button from "../../../button/button";
import ButtonVariances from "../../../buttonVariances/buttonVariances";
import Counter from "../../../counter/counter";
import Input from "../../../input/input";
import Header from "../headerDescription/headerDescription";
import ActionButton from "../../../button/button";

const classification = (props) => {
  let category = "";
  let StoreClasses = [classes.Type];
  StoreClasses.push("text-center");
  if (props.category != null) {
    category = props.category.category;
  }
  return (
    <div className={classes.Classification}>
      <Header
        category={props.category}
        offer={props.offer}
        price={props.price}
        priceId={props.priceId}
        hairlength={props.hairlength}
      />
      <ButtonVariances
        priceOptions={props.priceOptions}
        clicked={(val) => props.clicked(val)}
      />
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          width: "85%",
        }}
        className="pt-5"
      >
        <div style={{ paddingTop: "6px" }}>Type:</div>
        <div className={StoreClasses.join(" ")}>{category}</div>
      </div>
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          width: "85%",
        }}
        className="pt-5"
      >
        <div style={{ paddingTop: "6px" }}>Hair Type:</div>
        <div className={classes.Select}>
          <Input
            elementType={props.hairType.elementtype}
            elementconfig={props.hairType.elementconfig}
            elementName={props.hairType.elementname}
          />
        </div>
      </div>
      <Counter lclicked={props.lclicked} rclicked={props.rclicked} />
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          width: "85%",
        }}
        className="pt-5"
      >
        <div style={{ paddingTop: "6px" }}>Free Shipping:</div>
        <div>
          <div className={classes.FreeshippingText}>
            <span style={{ color: "#3FB22B", fontWeight: "bold" }}>
              Free Shipping
            </span>{" "}
            to United States Via USPS
          </div>
          <div className={classes.FreeshippingText}>
            <span style={{ color: "#989C98", fontSize: "15px" }}>
              Estimated Delivery Time:
            </span>{" "}
            <span
              style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}
            >
              72 hrs
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          width: "325px",
          marginTop: "30px",
        }}
      >
        <ActionButton whichButton={(val) => props.whichButton(val)}>
          Add To Cart
        </ActionButton>
        <ActionButton whichButton={(val) => props.whichButton(val)}>
          Buy Now
        </ActionButton>
      </div>
    </div>
  );
};

export default classification;
