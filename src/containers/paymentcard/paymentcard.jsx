import React, { Component } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import classes from "./PaymentCard.module.css";
import { connect } from "react-redux";

class PaymentCard extends Component {
  state = {
    cvc: "",
    expiry: "",
    email: "",
    focus: "",
    name: "",
    number: "",
    acceptedCards: ["visa", "mastercard"],
    validData: false,
  };
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };
  handleInputChange = (e) => {
    let tempState = { ...this.state };
    let valid = true;
    valid = e.target.value && valid;
    this.setState({ ...tempState, [e.target.name]: e.target.value });
  };
  payHandler = () => {
    let order = null;
    console.log("this.props.orders", this.props.orders);
    let orders = this.props.orders.map((value, index) => {
      let payment = 0.0;
      if (value.category.categoryid === 2) {
        if (value.category.isoffer) {
          if (value.offer.offertype == "PERCENT") {
            payment = value.totalprice - value.offer.amount * value.totalprice;
          }
        }
        order = {
          itemid: value.itemid,
          itemname: value.itemname,
          orderNum: value.lastidentityid,
          payment: payment,
        };
      }
    });
    let orderParam = {
      lastidentityid: this.props.lastidentityid,
      email: this.state.email,
    };
    fetch("https://heroku-seller-app.herokuapp.com/order", {
      method: "POST",
      body: JSON.stringify(orderParam),
      contentType: "application/json; charindex.set=utf-8",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status !== 401) {
          response.json().then((result) => {
            console.log(result);
          });
        } else {
        }
      })
      .catch((error) => console.log("Error:", error));
  };
  render() {
    return (
      <div id="PaymentForm" className={classes.PaymentCard}>
        <div className={classes.CardContainer}>
          <div className={classes.App}>
            <Cards
              cvc={this.state.cvc}
              expiry={this.state.expiry}
              focused={this.state.focus}
              name={this.state.name}
              number={this.state.number}
            />
            <form action="">
              <input
                type="tel"
                name="number"
                placeholder="Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Valid Thru"
                onChange={this.handleInputChange}
              />

              <input
                type="number"
                name="cvc"
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </form>
            <div className={classes.PayNow}>
              <div className="text-center pt-2" onClick={this.payHandler}>
                PAY NOW
              </div>
            </div>
          </div>
          <div className={classes.YourOrder}>
            <div className={classes.Header}>Your Order</div>
            <div className={classes.Line}></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quantity: state.quantity.quantity,
    orders: state.orderCategory.orders,
    lastidentityid: state.identity.lastidentityid,
  };
};

export default connect(mapStateToProps, null)(PaymentCard);
