import React from "react";
import classes from "./Classifications.module.css";
import Button from "../../../button/button";
import ButtonVariances from "../../../buttonVariances/buttonVariances";
import Counter from "../../../counter/counter";
import Input from "../../../input/input";
import Header from "../headerDescription/headerDescription";
import ActionButton from "../../../button/button";
import PayPal from "../../../../assets/paypal.png";
import Arrow from "../../../../assets/down_arrow.png";

const classification = (props) => {
  let category = "";
  let StoreClasses = [classes.Type];
  let storeClassif = [classes.HairClassification];
  if (props.categoryinfo != null) {
    if (props.categoryinfo.categoryid != 2) {
      storeClassif = [classes.Classification];
    }
  }
  StoreClasses.push("text-center");
  StoreClasses.push(classes.TextFont);
  if (props.category != null) {
    category = props.category.category;
  }
  return (
    <React.Fragment>
      <div className={storeClassif}>
        {props.categoryinfo != null ? (
          props.categoryinfo.categoryid != 2 ? (
            <div className={classes.displayPrice}>
              <div className="text-center pt-5">
                {props.categoryinfo.price} USD
              </div>
            </div>
          ) : null
        ) : null}
        {props.isOffer == true ? (
          <div>
            <Header
              category={props.category}
              offer={props.offer}
              price={props.price}
              priceId={props.priceId}
              hairlength={props.hairlength}
            />
          </div>
        ) : null}
        {props.categoryinfo != null ? (
          props.categoryinfo.categoryid == 2 ? (
            <ButtonVariances
              priceOptions={props.priceOptions}
              clicked={(val) => props.clicked(val)}
            />
          ) : null
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
          className="pt-5"
        >
          {props.categoryinfo != null ? (
            props.categoryinfo.categoryid == 0 ? (
              <div className={classes.TextFont} style={{ paddingTop: "9px" }}>
                Type:
              </div>
            ) : null
          ) : null}
          <div className={StoreClasses.join(" ")}>
            {props.itemname} {category}
          </div>
        </div>
        {props.categoryinfo != null ? (
          props.categoryinfo.categoryid == 2 ? (
            <div
              style={{
                margin: "auto",
                display: "flex",
                flexDirection: "row",
                width: "85%",
              }}
              className="pt-5"
            >
              <div className={classes.TextFont} style={{ paddingTop: "15px" }}>
                Hair Type:
              </div>
              <div className={classes.Select}>
                <img className={classes.SelectArrow} src={Arrow} />
                <Input
                  elementType={props.hairType.elementtype}
                  elementconfig={props.hairType.elementconfig}
                  elementName={props.hairType.elementname}
                  changed={props.changed}
                />
              </div>
            </div>
          ) : null
        ) : null}
        <Counter
          count={props.count}
          lclicked={(val) => props.lclicked(val)}
          rclicked={(val) => props.rclicked(val)}
        />
        <div className={classes.FreeShippingLabel}>
          <div>
            <div>
              <span style={{ color: "#3FB22B", fontWeight: "bold" }}>
                Free Shipping
              </span>{" "}
              to United States Via EMS
            </div>
            <div className={classes.FreeshippingText}>
              <span style={{ color: "#989C98", fontSize: "15px" }}>
                Estimated Delivery Time:
              </span>{" "}
              <span
                style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}
              >
                10 Days
              </span>
            </div>
          </div>
        </div>
        <div className={classes.GroupAction}>
          <ActionButton whichButton={(val) => props.whichButton(val)}>
            BUY NOW
          </ActionButton>
          <ActionButton whichButton={(val) => props.whichButton(val)}>
            ADD TO CART
          </ActionButton>
          {/* <ActionButton whichButton={(val) => props.whichButton(val)}>
          BOOK IT
        </ActionButton> */}
        </div>
        <div className={classes.PayPal}>
          <div className="text-center">
            <img src={PayPal} />
          </div>
        </div>
        <div className={classes.Review} onClick={props.clickReview}>
          <a href="#">REVIEW CART</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default classification;
