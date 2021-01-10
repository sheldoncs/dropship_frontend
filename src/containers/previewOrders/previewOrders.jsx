import React, { Component } from "react";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
import Settings from "../../components/settings/settings";
import NavigationItems from "../../components/navigationItems/NavigationItems";
import fetch from "../../fetchservice/fetchservice";
import { categoryQuery } from "../../Query/Query";
import Footer from "../../components/footer/footer";
import classes from "./PreviewOrders.module.css";
import Orders from "../../components/orders/orders";
import Subtotal from "../../components/subtotal/subtotal";
import OrderLabels from "../../components/orders/orderlabels/orderlabels";

class PreviewOrders extends Component {
  abortController = new AbortController();
  state = {
    menu: null,
    orders: null,
    totalprice: 0.0,
    offertotal: 0.0,
    grandtotal: 0.0,
    showOffer: false,
    quantity: 0,
    labels: [],
    offer: null,
  };
  calcTotals = (offer) => {
    let tempState = { ...this.state };
    let orders = null;

    if (this.props.orders.length > 0) {
      orders = this.props.orders;
      localStorage.setItem("orders", JSON.stringify(this.props.orders));
    } else {
      orders = JSON.parse(localStorage.getItem("orders"));
    }
    tempState.orders = orders;

    let quantity = 0;
    tempState.totalprice = 0;
    let totalQuantity = orders.map((data, index) => {
      quantity = Number(data.quantity) + Number(quantity);
      if (this.props.orders == null) {
        this.props.onSaveOrder(data);
      }
      let itemprice = Number(data.quantity) * Number(data.price);
      tempState.totalprice = itemprice + tempState.totalprice;
      return quantity;
    });

    if (offer != null) {
      if (offer.offertype == "PERCENT") {
        if (quantity >= 3) {
          tempState.showOffer = true;

          tempState.offertotal = (offer.amount / 100) * tempState.totalprice;
          tempState.grandtotal = tempState.totalprice - tempState.offertotal;
        } else {
          tempState.grandtotal = tempState.totalprice;
          tempState.showOffer = false;
        }
      } else if (offer.offertype == "SUBTRACT") {
      }
    }
    this.props.onSaveQuantity(totalQuantity);
    tempState.quantity = quantity;
    this.setState({ orders: tempState.orders, ...tempState });
  };
  componentDidMount() {
    let tempState = { ...this.state };
    let offer = null;

    if (this.props.offer != null) {
      let tempOffer = JSON.parse(localStorage.getItem("offer"));
      if (tempOffer == null) {
        localStorage.setItem("offer", JSON.stringify(this.props.offer));
      }
      offer = this.props.offer;
    } else {
      offer = JSON.parse(localStorage.getItem("offer"));
    }
    tempState.offer = offer;
    this.props.onSaveOffer(offer);

    this.calcTotals(offer);

    if (this.props.menu != null) {
      let tempMenu = this.props.menu;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      tempState.menu = filteredMenu;
      this.setState({ menu: tempState.menu });
    } else {
      this.fetchMenuQuery();
    }
  }
  fetchMenuQuery = () => {
    let query = categoryQuery;

    fetch(
      {
        query,
      },
      { signal: this.abortController.signal }
    ).then((res) => {
      let tempMenu = res.data.getAllCategories;
      var filteredMenu = tempMenu.filter(function (el) {
        return el.category == "Home";
      });
      this.setState({ menu: filteredMenu });
    });
  };
  componentWillUnmount() {
    this.abortController.abort();
  }

  spinnerHandler = (event, itemid) => {
    let tempState = { ...this.state };

    let filteredOrder = tempState.orders.filter(function (el) {
      return el.itemid == itemid;
    });
    filteredOrder[0].quantity = event.target.value;

    this.props.onUpdateOrder(filteredOrder);
    tempState.quantity = 0;
    tempState.orders.map((data, index) => {
      if (data.itemid == itemid) {
        tempState.orders[index].quantity = event.target.value;
        tempState.quantity =
          Number(event.target.value) + Number(tempState.quantity);
      } else {
        tempState.quantity = Number(data.quantity) + Number(tempState.quantity);
      }
      console.log(tempState.quantity, this.props.offer.offertype);

      this.props.onSaveQuantity(tempState.quantity);

      this.setState({ ...tempState });
      localStorage.setItem("orders", JSON.stringify(this.state.orders));
      this.calcTotals(this.props.offer);
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.user != null ? (
          <Settings
            count={this.state.quantity}
            showCart={true}
            welcome={this.props.user.firstname}
          />
        ) : (
          <Settings count={this.state.quantity} welcome="" showCart={true} />
        )}
        <NavigationItems
          menuItems={this.state.menu}
          page="login"
          clicked={(id) => this.navigationHandler(id)}
        />
        <div className={classes.CartLabel}>YOUR SHOPPING CART</div>
        <div className="mt-5">
          <OrderLabels />
        </div>
        <div className={classes.Container}>
          <Orders
            orders={this.state.orders}
            spinnerChange={(e, val) => this.spinnerHandler(e, val)}
          />
        </div>
        <Subtotal
          offerType={this.props.offer != null ? this.props.offer.offer : null}
          subtotal={this.state.totalprice}
          showOffer={this.state.showOffer}
          offerTotal={this.state.offertotal}
          grandTotal={this.state.grandtotal}
        />
        <Footer />
      </React.Fragment>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveOrder: (order) => dispatch(actionCreators.saveOrder(order)),
    onUpdateOrder: (order) => dispatch(actionCreators.updateOrder(order)),
    onSaveOffer: (offer) => dispatch(actionCreators.saveOffer(offer)),
    onSaveQuantity: (quantity) =>
      dispatch(actionCreators.saveQuantity(quantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewOrders);
