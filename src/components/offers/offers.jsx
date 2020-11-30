import React from "react";
import classes from "./Offer.module.css";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const Offer = (props) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  let strokeText = [classes.FontSettings];
  strokeText.push(classes.StrokeText);

  let btnClasses = [classes.Button];
  btnClasses.push("btn");
  btnClasses.push("btn-info");

  let offers = props.offers.map((value, index) => {
    let condLength = value.condition.length * 16;

    let code = ("Code:".length + value.code.length) * 19;
    return (
      <div key={value.id} className={classes.Sale}>
        <div className={classes.Container}>
          <div className={classes.SaleTextAlignment}>
            <div className={classes.FontSettings}>SALE</div>
            <div className={classes.FontSettings}>SALE</div>
            <div className={classes.FontSettings}>SALE</div>
          </div>
          <div key={value.id} className={classes.OfferContainer}>
            <div className={classes.LimitedOffer}>Limited Offer</div>
            <div
              style={{ width: value.width + "px" }}
              className={classes.Offer}
            >
              {value.offer}
            </div>
            <div
              style={{ width: condLength + "px" }}
              className={classes.Condition}
            >
              {value.condition}
            </div>
            <div style={{ width: code + "px" }} className={classes.Code}>
              Code:{value.code}
            </div>
            <button
              onClick={() => props.clicked(value.id)}
              className={btnClasses.join(" ")}
            >
              ORDER NOW!
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={10000}
      organicArrows={true}
      bullets={false}
      className={classes.SliderWidth}
    >
      {offers}
    </AutoplaySlider>
  );
};

export default Offer;
