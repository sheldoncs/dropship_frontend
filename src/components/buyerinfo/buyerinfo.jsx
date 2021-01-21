import React from "react";
import classes from "./BuyerInfo.module.css";
import logo from "../../assets/wizzy_wig.png";
import PayPal from "../../assets/paypal.png";
import Input from "../inputcheckout/input";
import Dropoff from "../../assets/dropoff.png";
import Pickup from "../../assets/pickup.png";
import Arrow from "../../assets/down_arrow.png";

const buyerinfo = (props) => {
  let arrowClass = [classes.Arrow];
  arrowClass.push(classes.Down);
  return (
    <div className={classes.BuyerInfo}>
      <div className={classes.Logo}>
        <img className={classes.LogoSize} src={logo} />
      </div>
      <div className={classes.ActionForm}>
        <div className={classes.Divide}>
          <fieldset className={classes.Fieldset}>
            <legend className={classes.Legend}>Express Checkout</legend>
            <div className={classes.PayPal}>
              <div className="text-center">
                <img className={classes.PayPalSize} src={PayPal} />
              </div>
            </div>
          </fieldset>
        </div>
        <div className={classes.choiceline}>
          <div className={classes.Line}></div>
          <div className="mt-3">OR</div>
          <div className={classes.Line}></div>
        </div>
        <div className={classes.CategoryHeader}>
          <div className={classes.LeftHeader}>Contact Information</div>
          <div className={classes.RightHeader}>
            Already have an account?
            <p style={{ paddingLeft: "10px" }}>
              <a href="#">Log in</a>
            </p>
          </div>
        </div>
        <div className={classes.Divide}>
          <Input
            key={"email"}
            changed={(event) => {
              props.inputChangeHandler(event, "email");
            }}
            visibility={props.checkoutForm["email"].visibility}
            elementType={props.checkoutForm["email"].elementtype}
            elementConfig={props.checkoutForm["email"].elementConfig}
            elementName={"email"}
          />
        </div>
        <div className={classes.RadioContainer}>
          <Input
            key={"dropDeliveryMethod"}
            visibility={props.checkoutForm["dropDeliveryMethod"].visibility}
            elementType={props.checkoutForm["dropDeliveryMethod"].elementtype}
            elementConfig={props.checkoutForm["dropDeliveryMethod"].elemConfig}
            elementName={"dropDeliveryMethod"}
            dispValue={props.checkoutForm["dropDeliveryMethod"].value}
            name={props.checkoutForm["dropDeliveryMethod"].name}
            icon={Dropoff}
          />
          <Input
            key={"pickDeliveryMethod"}
            visibility={props.checkoutForm["pickDeliveryMethod"].visibility}
            elementType={props.checkoutForm["pickDeliveryMethod"].elementtype}
            elementConfig={props.checkoutForm["pickDeliveryMethod"].elemConfig}
            elementName={"pickDeliveryMethod"}
            dispValue={props.checkoutForm["pickDeliveryMethod"].value}
            name={props.checkoutForm["pickDeliveryMethod"].name}
            icon={Pickup}
          />
        </div>
        <div className={classes.CategoryHeader}>
          <div className={classes.LeftHeader}>Shipping address</div>
        </div>
        <div className={classes.Divide}>
          <Input
            key={"firstname"}
            visibility={props.checkoutForm["firstname"].visibility}
            elementType={props.checkoutForm["firstname"].elementtype}
            elementConfig={props.checkoutForm["firstname"].elementConfig}
            elementName={"firstname"}
          />
        </div>
        <div className={classes.Divide}>
          <Input
            key={"lastname"}
            visibility={props.checkoutForm["lastname"].visibility}
            elementType={props.checkoutForm["lastname"].elementtype}
            elementConfig={props.checkoutForm["lastname"].elementConfig}
            elementName={"lastname"}
          />
        </div>
        <div className={classes.Divide}>
          <Input
            key={"address"}
            changed={(event) => {
              props.inputChangeHandler(event, "address");
            }}
            visibility={props.checkoutForm["address"].visibility}
            elementType={props.checkoutForm["address"].elementtype}
            elementConfig={props.checkoutForm["address"].elementConfig}
            elementName={"address"}
          />
        </div>
        <div className={classes.Divide}>
          <Input
            key={"accomodation"}
            changed={(event) => {
              props.inputChangeHandler(event, "accomodation");
            }}
            visibility={props.checkoutForm["accomodation"].visibility}
            elementType={props.checkoutForm["accomodation"].elementtype}
            elementConfig={props.checkoutForm["accomodation"].elementConfig}
            elementName={"accomodation"}
          />
        </div>
        <div className={classes.Divide}>
          <div className={classes.CountryContainer}>
            <div className={classes.SelectContainer}>
              <div className={classes.Region}>Country/Region</div>
              <img
                style={{
                  position: "absolute",
                  left: "40%",
                  paddingTop: "20px",
                }}
                src={Arrow}
              />

              <Input
                key={"country"}
                changed={(event) => {
                  props.inputChangeHandler(event, "country");
                }}
                visibility={props.checkoutForm["country"].visibility}
                elementType={props.checkoutForm["country"].elementtype}
                elementConfig={props.checkoutForm["country"].elementConfig}
                elementName={"country"}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "40px" }} className={classes.Divide}>
          <Input
            key={"postalcode"}
            changed={(event) => {
              props.inputChangeHandler(event, "postalcode");
            }}
            visibility={props.checkoutForm["postalcode"].visibility}
            elementType={props.checkoutForm["postalcode"].elementtype}
            elementConfig={props.checkoutForm["postalcode"].elementConfig}
            elementName={"postalcode"}
          />
        </div>
        <div className={classes.Divide}>
          <Input
            key={"phone"}
            changed={(event) => {
              props.inputChangeHandler(event, "phone");
            }}
            visibility={props.checkoutForm["phone"].visibility}
            elementType={props.checkoutForm["phone"].elementtype}
            elementConfig={props.checkoutForm["phone"].elementConfig}
            elementName={"phone"}
          />
        </div>
      </div>
    </div>
  );
};

export default buyerinfo;
