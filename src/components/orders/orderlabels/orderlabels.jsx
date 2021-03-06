import React from "react";
import classes from "./OrderLabels.module.css";

const OrderLabels = (props) => {
  return (
    <div className={classes.OrderLabels}>
      <div className={classes.Labels}>
        <div className={classes.LabelDivider}>
          <b>PRODUCT</b>
        </div>
        <div className={classes.Result}>
          {props.summaryInfo.itemname}{" "}
          {props.category != null
            ? !props.category.isOffer
              ? props.category.category
              : null
            : null}
        </div>
      </div>
      {props.category != null ? (
        props.category.isOffer ? (
          <div>
            <div className={classes.Labels}>
              <div className={classes.LabelDivider}>
                <b>HAIR TYPE</b>
              </div>
              <div className={classes.Result}>{props.summaryInfo.hairtype}</div>
            </div>
            <div className={classes.Labels}>
              <div className={classes.LabelDivider}>
                <b>HAIR LENGTH</b>
              </div>
              <div className={classes.Result}>
                {props.summaryInfo.hairlength}
              </div>
            </div>
          </div>
        ) : null
      ) : null}
      <div className={classes.Labels}>
        <div className={classes.LabelDivider}>
          <b>QUANTITY</b>
        </div>
        <div className={classes.Result}>{props.summaryInfo.quantity}</div>
      </div>
      <div className={classes.Labels}>
        <div className={classes.LabelDivider}>
          <b>UNIT PRICE</b>
        </div>
        <div className={classes.Result}>{props.summaryInfo.price}</div>
      </div>
      <div className={classes.Labels}>
        <div className={classes.LabelDivider}>
          <b>TOTAL PRICE</b>
        </div>
        <div className={classes.Result}>
          {Number(props.summaryInfo.totalprice).toFixed(2)}
        </div>
      </div>
      {props.category != null ? (
        props.category.isOffer ? (
          <div className={classes.Labels}>
            <div className={classes.LabelDivider}>
              <b>{props.summaryInfo.offer.offer}</b>
            </div>
            <div className={classes.Result}>
              {Number(props.summaryInfo.deduction).toFixed(2)}
            </div>
          </div>
        ) : null
      ) : null}
      {props.category != null ? (
        props.category.isOffer ? (
          <div className={classes.Labels}>
            <div className={classes.LabelDivider}>
              <b>ITEM PRICE</b>
            </div>
            <div className={classes.Result}>
              {Number(props.summaryInfo.itemprice).toFixed(2)}
            </div>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default OrderLabels;
