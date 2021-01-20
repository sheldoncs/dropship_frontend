import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";
import classes from "./Checkout.module.css";
import BuyerInfo from "../../components/buyerinfo/buyerinfo";
import fetch from "../../fetchservice/fetchservice";
import { getAllCountries } from "../../Query/Query";

class Checkout extends Component {
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
        },
        exist: false,
        valid: false,
        touched: false,
        // regExpression: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      firstname: {
        elementtype: "input",
        visibility: "visible",
        elementConfig: { type: "text", placeholder: "firstname" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      lastname: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "lastname" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
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
        valid: false,
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
          minLength: 8,
        },
        valid: false,
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
          minLength: 8,
        },
        valid: false,
        touched: false,
        exist: false,

        // regExpression: /^[A-Za-z0-9]+\w+[^A-Za-z0-9]+\d{2}$/,
        message: "",
      },
      country: {
        elementtype: "select",
        elementconfig: {
          selectoptions: [{ value: "fastest", displayValue: "fastest" }],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
      postalcode: {
        elementtype: "input",
        elementConfig: { type: "text", placeholder: "postal code" },
        value: "",
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
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
          minLength: 8,
        },
        valid: false,
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
      },
      pickDeliveryMethod: {
        elementtype: "radio",
        elemConfig: { type: "radio" },
        value: "Pickup",
        name: "deliveryMethod",
      },
    },
    hasAuthenticated: false,
    isRegistering: false,
    saveActivated: false,
    mounted: false,
    showError: false,
  };
  pushPage = () => {
    let page = { page: "PAYMENT", path: "/payment" };
    if (this.props.pages.length > 0) {
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
  orderHandler = (event) => {
    event.preventDefault();
  };
  inputChangeHandler = (event, key) => {};
  componentDidMount() {}

  fetchAllCountries() {}
  render() {
    return (
      <div className={classes.Checkout}>
        <form className={classes.Form} onSubmit={this.orderHandler}>
          <BuyerInfo
            checkoutForm={this.state.checkoutForm}
            inputChangeHandler={(eve, key) => this.inputChangeHandler(eve, key)}
          />
        </form>
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
