import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import classes from "./Checkout.module.css";
import BuyerInfo from "../../components/buyerinfo/buyerinfo";
import fetch from "../../fetchservice/fetchservice";
import { getAllCountries } from "../../Query/Query";
import CheckoutSummary from "../../components/checkoutsummary/checkoutsummary";

class Checkout extends Component {
  abortController = new AbortController();
  state = {
    orders: [],
    checkoutForm: {
      email: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "email or mobile number" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
          regExpression: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        exist: false,
        valid: true,
        touched: false,
      },
      firstname: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "firstname" },
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
      lastname: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "lastname" },
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
      address: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "Address" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: true,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      accomodation: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Apartment, suite, etc. (optional)",
        },
        value: "",
        validation: {
          required: true,
          minLength: 1,
        },
        valid: true,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      city: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "apt., suite optional" },
        value: "",
        validation: {
          required: true,
          minLength: 1,
        },
        valid: true,
        touched: false,
        exist: false,
        message: "",
      },
      country: {
        elementtype: "select",
        elementConfig: {
          selectoptions: [],
        },
        value: "",
        validation: { required: true },
        valid: true,
      },
      postalcode: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "postal code" },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: true,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      phone: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "phone" },
        value: "",
        validation: {
          required: true,
          minLength: 7,
        },
        valid: true,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      dropDeliveryMethod: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "Drop-Off",
        name: "deliveryMethod",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        exist: false,
      },
      pickDeliveryMethod: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "Pickup",
        name: "deliveryMethod",
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        exist: false,
      },
    },
    formIsValid: false,
    hasAuthenticated: false,
    isRegistering: false,
    saveActivated: false,
    mounted: false,
    showError: false,
    category: null,
  };
  pushPage = () => {
    let page = { page: "PAYMENT", path: "/payment" };
    if (this.props.pages) {
      const found = this.props.pages.find(
        (element) => element.page == "PAYMENT"
      );
      if (!found) {
        this.props.onSavePage(page);
      }
    } else {
      this.props.onSavePage(page);
    }
  };
  orderHandler = () => {
    let tempState = { ...this.state };
    let updatedCheckoutForm = tempState.checkoutForm;

    let formIsValid = true;

    for (let inputIdentifier in updatedCheckoutForm) {
      updatedCheckoutForm[inputIdentifier].valid = this.checkValidity(
        updatedCheckoutForm[inputIdentifier].value,
        updatedCheckoutForm[inputIdentifier].validation
      );

      formIsValid = updatedCheckoutForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      checkoutForm: updatedCheckoutForm,
      formIsValid: formIsValid,
    });
    this.props.history.push("/payment");
  };
  inputChangeHandler = (event, inputIdentifier) => {
    event.preventDefault();

    /*Cloned*/
    const updatedCheckoutForm = { ...this.state.checkoutForm };
    const updatedFormElement = { ...updatedCheckoutForm[inputIdentifier] };
    /*Cloned*/
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.touched = true;
    updatedCheckoutForm[inputIdentifier] = updatedFormElement;
    this.setState({
      checkoutForm: updatedCheckoutForm,
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
  componentDidMount() {
    let tempState = { ...this.state };
    let orders = null;
    let category = JSON.parse(sessionStorage.getItem("category"));
    orders = this.props.orders;

    tempState.orders = orders;
    tempState.category = category;
    this.setState({ ...tempState });
    this.fetchAllCountries();
  }
  componentWillUnmount() {
    this.abortController.abort();
  }
  fetchAllCountries() {
    let query = getAllCountries;

    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let allCountries = res.data.getAllCountries;
      let tempState = { ...this.state };

      allCountries.map((data, index) => {
        tempState.checkoutForm.country.elementConfig.selectoptions.push({
          value: data.country_code,
          displayvalue: data.country_name,
        });
        this.setState({ ...tempState });
      });
    });
  }
  render() {
    return (
      <div className={classes.Checkout}>
        <form className={classes.Form}>
          <BuyerInfo
            checkoutForm={this.state.checkoutForm}
            inputChangeHandler={(eve, key) => this.inputChangeHandler(eve, key)}
            clicked={this.orderHandler}
          />
        </form>
        <CheckoutSummary
          orders={this.state.orders}
          className={classes.CheckoutSummary}
          category={this.state.category}
        ></CheckoutSummary>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu.menu,
    user: state.login.user,
    offer: state.offer.offer,
    orders: state.orderCategory.orders,
    quantity: state.orderCategory.quantity,
    pages: state.navPages.pages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSavePage: (page) => dispatch(actionCreators.savePage(page)),
    onRemovePage: (page) => dispatch(actionCreators.removePage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
