import React from "react";
import classes from "./Orders.module.css";
import dustbin from "../../assets/dustbin.png";
import Orderlabels from "./orderlabels/orderlabels";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const orders = (props) => {
  let orderinfo = null;
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  if (props.orders != null) {
    orderinfo = props.orders.map((value, index) => {
      return (
        <div className={classes.Slider} key={index}>
          <div className={classes.Orders}>
            <div className={classes.PhotoContainer}>
              <img className={classes.Photo} src={value.photo} />
            </div>
            <div>
              <Orderlabels summaryInfo={value} category={value.category} />
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={10000}
      organicArrows={false}
      bullets={true}
    >
      {orderinfo}
    </AutoplaySlider>
  );
};

export default orders;
