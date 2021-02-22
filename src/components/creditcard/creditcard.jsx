import React from "react";
import Input from "../input/input";
import classes from "./CreditCard.module.css";

const CreditCard = (props) => {
  props.creditCardForm.map((key, index) => {});
  return (
    <div className={classes.CreditCard}>
      <div className={classes.Divide}>
        <Input
          key={"cardNumber"}
          changed={(event) => {
            props.inputChangeHandler(event, "cardNumber");
          }}
          visibility={props.creditCardForm["cardNumber"].visibility}
          elementType={props.creditCardForm["email"].elementtype}
          elementConfig={props.creditCardForm["email"].elementConfig}
          valid={props.creditCardForm["email"].valid}
          elementName={"cardNumber"}
        />
      </div>
    </div>
  );
};
export default CreditCard;
