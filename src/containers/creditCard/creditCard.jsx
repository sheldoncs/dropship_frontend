import React, { Component } from "react";
import Payments from "../../components/creditcard/creditcard";

class CreditCard extends Component {
  state = {
    creditCardForm: {
      cardNumber: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: {
          type: "text",
          placeholder: "xxxx xxxx xxxx xxxx",
          pattern: /^[0-9\s]{13,19}$/,
        },
        value: "",
        validation: {
          required: true,
          maxLength: 19,
          regExpression: /^[0-9\s]{13,19}$/,
        },
        exist: false,
        valid: true,
        touched: false,
      },
      nameoncard: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "name" },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          regExpression: /[A-Za-z]+$/,
        },
        valid: true,
        touched: false,
        exist: false,
        message: "",
      },
      carddate: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "MM / YY",
          pattern: /^[0-9]{2}\/[0-9]{2}$/,
        },
        value: "",
        validation: {
          required: true,
          minLength: 1,
          regExpression: /^[0-9]{2}\/[0-9]{2}$/,
        },
        valid: true,
        touched: false,
        exist: false,
        message: "",
      },
      cvv: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "cvv" },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 4,
        },
        valid: true,
        touched: false,
        exist: false,
        regExpression: /^[0-9]{3,4}$/,
        message: "",
      },
    },
  };
  inputChangeHandler = (event, inputIdentifier) => {
    event.preventDefault();

    /*Cloned*/
    const updatedCreditCardForm = { ...this.state.creditCardForm };
    const updatedFormElement = { ...updatedCreditCardForm[inputIdentifier] };
    /*Cloned*/
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedCreditCardForm[inputIdentifier] = updatedFormElement;
    this.setState({
      checkoutForm: updatedCreditCardForm,
    });
    // this.props.onValidateForm(formIsValid);
  };
  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.regExpression) {
      const testExpress = new RegExp(rules.regExpression);
      let regexValid = testExpress.test(value);
      isValid = regexValid && isValid;
    }

    return isValid;
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <form>
          <Payments creditCardForm={this.state.creditCardForm} />
        </form>
      </div>
    );
  }
}

export default CreditCard;
