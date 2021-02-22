import React from "react";
import classes from "./CheckoutSummary.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import freeshipping from "../../assets/freeshipping.png";

export const checkoutsummary = (props) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  let subtotal = 0.0;
  let offer = 0.0;
  let total = 0.0;

  let summary = null;
  if (props.orders != null) {
    summary = props.orders.map((data, index) => {
      console.log("data", data);
      subtotal = data.quantity * data.price + subtotal;
      if (props.category != null && props.category.isOffer) {
        if (data.offer.offertype == "PERCENT") {
          offer = data.deduction + offer;
        } else if (data.offer.offertype == "SUBTRACT") {
          offer = data.offer.amount * data.quantity + offer;
        }
      }
      total = subtotal - offer;
      return (
        <div className={classes.PhotoContainer} key={index}>
          <div className={classes.Quantity}>
            <div className="text-center pt-1">{data.quantity}</div>
          </div>
          <div className={classes.PhotoCover}>
            <img className={classes.Photos} src={data.photo} />
          </div>
          <div className={classes.NameContainer}>
            <div style={{ width: "80%", justifyContent: "flex-start" }}>
              {data.hairtype} {data.itemname}
            </div>
            <div style={{ width: "25%", justifyContent: "flex-end" }}>
              {(data.quantity * data.price).toFixed(2)}
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <React.Fragment>
      <div className={classes.CheckoutSummary}>
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={5000}
          organicArrows={false}
          bullets={true}
        >
          {summary}
        </AutoplaySlider>
        <div className={classes.TotalContainer}>
          <div className={classes.Row}>
            <div className={classes.SubTotalText}>Sub Total</div>
            <div className={classes.SubTotal}>{subtotal.toFixed(2)}</div>
          </div>
          <div className={classes.Row}>
            <div className={classes.FreeShipping}>
              <img src={freeshipping} />
              <div>Free Shipping to Canada, USA and UK</div>
            </div>
          </div>
          <div className={classes.Line}></div>

          {offer > 0 ? (
            <div>
              <div className={classes.Row}>
                <div className={classes.SubTotalText}>Deduct</div>
                <div className={classes.SubTotal}>{offer.toFixed(2)}</div>
              </div>
              <div className={classes.Line}></div>
            </div>
          ) : null}
          <div className={classes.Row}>
            <div className={classes.SubTotalText}>Total</div>
            <div className={classes.SubTotal}>{total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default checkoutsummary;
